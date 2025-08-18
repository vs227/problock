// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// NOTE: We pin OpenZeppelin to v4.9.x to keep ERC20Snapshot (removed in OZ v5).
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title PropertyToken
 * @notice ERC20 token representing fractionalized property shares. Uses snapshots
 *         to compute trustless yield/Dividend distribution at specific points in time.
 *         Owner can mint (primary issuance) and take snapshots.
 */
contract PropertyToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Snapshot, Ownable, Pausable {
    event SnapshotCreated(uint256 indexed snapshotId, address indexed by);

    constructor(
        string memory name_,
        string memory symbol_,
        address owner_,
        uint256 initialSupply // 18 decimals
    ) ERC20(name_, symbol_) ERC20Permit(name_) {
        _transferOwnership(owner_);
        if (initialSupply > 0) {
            _mint(owner_, initialSupply);
        }
    }

    /// @notice Mint new tokens (e.g., when tokenizing a new property tranche).
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Create a new snapshot id; use it right before starting a distribution.
    function createSnapshot() external onlyOwner returns (uint256) {
        uint256 id = _snapshot();
        emit SnapshotCreated(id, msg.sender);
        return id;
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // === Internal hooks ===
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "Token: paused");
    }
}
