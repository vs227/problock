# PropShare on Polygon — Smart Contracts

This folder contains a production-ready Hardhat project for **PropShare**, designed to run on **Polygon PoS** (Amoy testnet for development, mainnet for production). It includes:

- `PropertyToken.sol` — ERC20 with **snapshots** (pinning OpenZeppelin v4.9.x) for trustless yield/dividend calculations.
- `DividendDistributor.sol` — Distributes stablecoin yield (e.g., **USDC**) to token holders based on a snapshot, with **pull-based claims**.
- `PrimarySale.sol` — Minimal primary issuance contract to sell PropertyToken for USDC to investors.

> ⚠️ **Compliance is your responsibility.** Real-estate tokenization may be regulated in your jurisdiction. This code is for educational use; audit and obtain legal counsel before mainnet.

---

## Prereqs

- Node.js 18+ and npm
- A funded wallet on Amoy (test POL/MATIC). Get from the official faucet.
- (Recommended) An RPC provider (Alchemy/Infura/QuickNode) for Amoy & Polygon.
- A **Polygonscan API key** (free) for contract verification.

---

## Install

```bash
cd propshare-blockchain
cp .env.sample .env
# fill in PRIVATE_KEY, POLYGONSCAN_API_KEY, TREASURY_ADDRESS and optional RPCs
npm i
```

> We **pin OpenZeppelin to v4.9.x** because `ERC20Snapshot` was **removed in OZ v5**. If you move to v5 in the future, you’ll need a different approach (e.g., `ERC20Votes` or your own accounting).

---

## Networks

- **Amoy testnet** — chainId `80002`, RPC `https://rpc-amoy.polygon.technology`, explorer `https://amoy.polygonscan.com`
- **Polygon PoS mainnet** — chainId `137`, explorer `https://polygonscan.com`

Default RPCs are included; you can set your own in `.env`.

---

## Compile

```bash
npm run compile
```

## Deploy (Amoy)

```bash
npm run deploy:amoy
```

This writes addresses to `deployments/addresses.json` for your frontend.

## Verify

```bash
npm run verify:amoy <contractAddress> --constructor-args <args...>
# Example: npx hardhat verify --network amoy $(jq -r .PropertyToken deployments/addresses.json) "PropShare Token" "PST" <owner> 0
```

If your Hardhat doesn't yet include Amoy in `hardhat-verify`, we add a `customChains` entry in `hardhat.config.js` to make it work.

---

## Create a yield distribution (USDC)

1) Create a snapshot and a new distribution with 1000 USDC:

```bash
npm run dist:new
```

- Owner must hold USDC on Amoy and approve the distributor (script does this).
- We use **USDC on Amoy** at `0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582`.

2) Token holders call `claim(distId)` directly, or you can call via script:

```bash
DIST_ID=0 npm run claim
```

---

## Primary sale (USDC)

- The deployment funds the sale contract with 100,000 PST.
- Default price is **1 USDC per PST**. Update with `setPrice()`.
- Buyers approve USDC to the sale contract, then call `buy(amount)`.

---

## Frontend wiring (your `unic/unic/client`)

1. Copy `deployments/addresses.json` into your client (e.g., `src/chain/addresses.json`).
2. Copy ABIs from `artifacts/contracts/*/*.json`, or import using a small ABI exporter.
3. Use `ethers` in your React app:
   - **Sale**: call `buy(amount)` on `PrimarySale` after `usdc.approve()`.
   - **Claim**: call `entitlement(distId, account)` and `claim(distId)` on `DividendDistributor`.
   - **Info**: read `totalSupply()`, `balanceOf(account)` on `PropertyToken`.

---

## Common errors

- `insufficient funds for gas` → Top up test POL/MATIC.
- `invalid BigNumber string` → Ensure amounts use 18 or 6 decimals correctly.
- Verify fails on Polygonscan → Ensure your `compiler version` and optimization settings match, and Amoy network is configured under `etherscan.customChains`.

---

## Security notes

- The distributor uses **pull** payments — users claim individually.
- Rounding may leave tiny "dust" unclaimed; owner can sweep on close.
- Do not airdrop to thousands of holders from a loop on-chain — use the distributor.

---

© 2025 PropShare. MIT licensed.
