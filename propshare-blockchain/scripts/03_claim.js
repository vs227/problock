const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [claimer] = await hre.ethers.getSigners();
  const addresses = JSON.parse(fs.readFileSync("deployments/addresses.json", "utf8"));
  const distributor = await hre.ethers.getContractAt("DividendDistributor", addresses.DividendDistributor);

  const distId = parseInt(process.env.DIST_ID || "0", 10);
  const owed = await distributor.entitlement(distId, claimer.address);
  console.log(`Entitlement for ${claimer.address} on distribution ${distId}:`, owed.toString());

  if (owed > 0n) {
    const tx = await distributor.claim(distId);
    await tx.wait();
    console.log(`Claimed ${owed.toString()} from distribution ${distId}`);
  } else {
    console.log("Nothing to claim.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
