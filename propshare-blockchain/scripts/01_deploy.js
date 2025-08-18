const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function estimateDeployment(factory, args, name) {
  const tx = factory.getDeployTransaction(...args);
  const gasEstimate = await hre.ethers.provider.estimateGas(tx);

  // ethers v6 way
  const feeData = await hre.ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice; // bigint
  const cost = gasEstimate * gasPrice;

  console.log(
    `${name} -> Estimated gas: ${gasEstimate.toString()}, cost ≈ ${hre.ethers.formatEther(cost)} MATIC`
  );

  return cost;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const chainId = await hre.network.provider.send("eth_chainId", []);
  console.log(
    `Deploying to ${hre.network.name} (chainId ${parseInt(
      chainId,
      16
    )}) with: ${deployer.address}`
  );

  // Config
  const NAME = "PropShare Token";
  const SYMBOL = "PST";
  const INITIAL_SUPPLY = hre.ethers.parseUnits("1000000", 18); // 1,000,000 PST
  const USDC_AMOY = "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582"; // Circle USDC on Amoy
  const treasury = process.env.TREASURY_ADDRESS || deployer.address;
  const PRICE_USDC_PER_TOKEN = 1_000_000; // 1 USDC per 1 PST

  // Factories
  const PropertyToken = await hre.ethers.getContractFactory("PropertyToken");
  const DividendDistributor = await hre.ethers.getContractFactory(
    "DividendDistributor"
  );
  const PrimarySale = await hre.ethers.getContractFactory("PrimarySale");

  // ---- Estimate total gas ----
  const est1 = await estimateDeployment(
    PropertyToken,
    [NAME, SYMBOL, deployer.address, INITIAL_SUPPLY],
    "PropertyToken"
  );
  const est2 = await estimateDeployment(
    DividendDistributor,
    [deployer.address, deployer.address], // just dummy for estimate, real args below
    "DividendDistributor"
  );
  const est3 = await estimateDeployment(
    PrimarySale,
    [deployer.address, USDC_AMOY, treasury, PRICE_USDC_PER_TOKEN],
    "PrimarySale"
  );

  const totalEst = est1 + est2 + est3;
  const balance = await hre.ethers.provider.getBalance(deployer.address);

  console.log(
    `Deployer balance: ${hre.ethers.formatEther(balance)} MATIC, Estimated total deploy cost: ${hre.ethers.formatEther(
      totalEst
    )} MATIC`
  );

  if (balance < totalEst) {
    console.error("❌ Not enough MATIC for deployment.");
    process.exit(1);
  }

    // ---- Deploy ----
  const token = await PropertyToken.deploy(
    NAME,
    SYMBOL,
    deployer.address,
    INITIAL_SUPPLY,
    { gasLimit: 6000000 }
  );
  await token.waitForDeployment();
  console.log("✅ PropertyToken:", await token.getAddress());

  const distributor = await DividendDistributor.deploy(
    await token.getAddress(),
    deployer.address,
    { gasLimit: 4000000 }
  );
  await distributor.waitForDeployment();
  console.log("✅ DividendDistributor:", await distributor.getAddress());

  const sale = await PrimarySale.deploy(
    await token.getAddress(),
    USDC_AMOY,
    treasury,
    PRICE_USDC_PER_TOKEN,
    { gasLimit: 4000000 }
  );
  await sale.waitForDeployment();
  console.log("✅ PrimarySale:", await sale.getAddress());


  // Seed sale with some PST
  const tx = await token.transfer(
    await sale.getAddress(),
    hre.ethers.parseUnits("100000", 18)
  );
  await tx.wait();
  console.log("✅ Seeded sale with 100,000 PST");

  // Save deployments
  const out = {
    network: hre.network.name,
    PropertyToken: await token.getAddress(),
    DividendDistributor: await distributor.getAddress(),
    PrimarySale: await sale.getAddress(),
    USDC: USDC_AMOY,
    deployedAt: new Date().toISOString(),
  };
  fs.mkdirSync("deployments", { recursive: true });
  fs.writeFileSync("deployments/addresses.json", JSON.stringify(out, null, 2));
  console.log("📁 Saved deployments/addresses.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
