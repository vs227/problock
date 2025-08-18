// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Metadata {
    function decimals() external view returns (uint8);
}

/// @title PrimarySale
/// @notice Simple primary issuance contract that sells PropertyToken for an ERC20 stablecoin (e.g., USDC).
/// @dev The contract must hold enough PropertyToken inventory (transfer tokens here first).
contract PrimarySale is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable propertyToken;
    IERC20 public immutable paymentToken; // e.g., USDC on Polygon

    address public treasury;
    uint256 public priceUSDCPerToken; // price in smallest paymentToken units per 1 full token (1e18)
    uint256 public minPurchase;       // minimum buy in token units (18 decimals)

    event Purchased(address indexed buyer, uint256 tokenAmount, uint256 costPaid, address paymentToken);
    event PriceSet(uint256 newPrice);
    event TreasurySet(address newTreasury);
    event MinPurchaseSet(uint256 minPurchase);

    constructor(address _propertyToken, address _paymentToken, address _treasury, uint256 _priceUSDCPerToken) {
        require(_propertyToken != address(0) && _paymentToken != address(0) && _treasury != address(0), "zero");
        propertyToken = IERC20(_propertyToken);
        paymentToken = IERC20(_paymentToken);
        treasury = _treasury;
        priceUSDCPerToken = _priceUSDCPerToken; // e.g., 1 USDC => 1_000_000
        minPurchase = 1e16; // default 0.01 token
    }

    function setPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "price=0");
        priceUSDCPerToken = newPrice;
        emit PriceSet(newPrice);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "zero");
        treasury = newTreasury;
        emit TreasurySet(newTreasury);
    }

    function setMinPurchase(uint256 _min) external onlyOwner {
        require(_min > 0, "min=0");
        minPurchase = _min;
        emit MinPurchaseSet(_min);
    }

    /// @notice Buy `amount` of PropertyToken using paymentToken. Caller must approve() cost first.
    /// @param amount Amount of PropertyToken in 18 decimals (e.g., 1e18 = 1 token).
    function buy(uint256 amount) external nonReentrant {
        require(amount >= minPurchase, "below minimum");
        // cost = amount * price / 1e18 (keeps result in paymentToken's smallest units)
        uint256 cost = (amount * priceUSDCPerToken) / 1e18;
        require(cost > 0, "cost=0");

        // Pull funds to treasury
        paymentToken.safeTransferFrom(msg.sender, treasury, cost);

        // Send tokens to buyer
        propertyToken.safeTransfer(msg.sender, amount);

        emit Purchased(msg.sender, amount, cost, address(paymentToken));
    }
}
