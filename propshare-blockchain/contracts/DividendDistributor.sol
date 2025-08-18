// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface ISnapshotToken {
    function balanceOfAt(address account, uint256 snapshotId) external view returns (uint256);
    function totalSupplyAt(uint256 snapshotId) external view returns (uint256);
}

/// @title DividendDistributor
/// @notice Pull-based distribution of yield in an ERC20 (e.g., USDC) using snapshot balances.
contract DividendDistributor is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Distribution {
        uint256 snapshotId;
        IERC20 payoutToken;      // e.g., USDC
        uint256 totalAmount;     // total tokens to distribute
        uint256 claimedAmount;   // running total claimed
        uint64  createdAt;
        bool    closed;
    }

    ISnapshotToken public immutable propertyToken;
    Distribution[] public dists;
    mapping(uint256 => mapping(address => uint256)) public claimed; // distId => user => amount claimed

    event DistributionCreated(uint256 indexed distId, uint256 indexed snapshotId, address token, uint256 amount);
    event Claimed(uint256 indexed distId, address indexed account, uint256 amount);
    event Closed(uint256 indexed distId, uint256 unclaimedSwept);

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(address _propertyToken, address _owner) {
        require(_propertyToken != address(0) && _owner != address(0), "zero");
        propertyToken = ISnapshotToken(_propertyToken);
        owner = _owner;
    }

    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero");
        owner = newOwner;
    }

    /// @notice Owner must approve() this contract to pull `amount` of payoutToken before calling.
    function newDistribution(uint256 snapshotId, address payoutToken, uint256 amount) external onlyOwner returns (uint256 distId) {
        require(payoutToken != address(0) && amount > 0, "bad params");
        dists.push(Distribution({
            snapshotId: snapshotId,
            payoutToken: IERC20(payoutToken),
            totalAmount: amount,
            claimedAmount: 0,
            createdAt: uint64(block.timestamp),
            closed: false
        }));
        distId = dists.length - 1;
        IERC20(payoutToken).safeTransferFrom(msg.sender, address(this), amount);
        emit DistributionCreated(distId, snapshotId, payoutToken, amount);
    }

    function distributionsLength() external view returns (uint256) {
        return dists.length;
    }

    /// @notice Returns the user's entitled amount for a given distribution.
    function entitlement(uint256 distId, address account) public view returns (uint256) {
        Distribution memory d = dists[distId];
        if (d.closed) return 0;
        uint256 userBal = propertyToken.balanceOfAt(account, d.snapshotId);
        if (userBal == 0) return 0;
        uint256 supply = propertyToken.totalSupplyAt(d.snapshotId);
        if (supply == 0) return 0;
        uint256 share = (d.totalAmount * userBal) / supply;
        uint256 already = claimed[distId][account];
        if (share <= already) return 0;
        return share - already;
    }

    function claim(uint256 distId) public nonReentrant {
        uint256 amount = entitlement(distId, msg.sender);
        require(amount > 0, "nothing to claim");
        claimed[distId][msg.sender] += amount;
        dists[distId].claimedAmount += amount;
        dists[distId].payoutToken.safeTransfer(msg.sender, amount);
        emit Claimed(distId, msg.sender, amount);
    }

    function claimMany(uint256[] calldata ids) external {
        for (uint256 i = 0; i < ids.length; i++) {
            claim(ids[i]);
        }
    }

    /// @notice Close a distribution and sweep any unclaimed funds back to owner.
    function closeAndSweep(uint256 distId, address to) external onlyOwner nonReentrant {
        Distribution storage d = dists[distId];
        require(!d.closed, "already closed");
        d.closed = true;
        uint256 unclaimed = d.totalAmount - d.claimedAmount;
        if (unclaimed > 0) {
            d.payoutToken.safeTransfer(to, unclaimed);
        }
        emit Closed(distId, unclaimed);
    }
}
