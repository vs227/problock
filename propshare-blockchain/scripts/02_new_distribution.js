const hre = require("hardhat");
const fs = require("fs");
require('dotenv').config();

async function main() {
  const [sender] = await hre.ethers.getSigners();
  const addresses = JSON.parse(fs.readFileSync("deployments/addresses.json", "utf8"));

  const token = await hre.ethers.getContractAt("PropertyToken", addresses.PropertyToken);
  const distributor = await hre.ethers.getContractAt("DividendDistributor", addresses.DividendDistributor);
  const usdc = await hre.ethers.getContractAt("IERC20", addresses.USDC);

  // 1) Create snapshot
  const snapTx = await token.createSnapshot();
  const snapRcpt = await snapTx.wait();
  const event = (await token.queryFilter(token.filters.SnapshotCreated(), snapRcpt.blockNumber, snapRcpt.blockNumber))[0];
  const snapshotId = event.args[0].toString();
  console.log("Snapshot created:", snapshotId);

  // 2) Approve and create distribution (example: 1000 USDC)
  const amountUSDC = 1_000_000_000; // 1000 USDC (6 dp)
  await (await usdc.approve(addresses.DividendDistributor, amountUSDC)).wait();
  const dtx = await distributor.newDistribution(snapshotId, addresses.USDC, amountUSDC);
  const rcpt = await dtx.wait();
  const distId = (await distributor.distributionsLength()) - 1n;
  console.log(`Distribution #${distId} created for snapshot ${snapshotId} with ${amountUSDC} USDC`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
