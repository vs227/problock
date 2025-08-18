require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const { PRIVATE_KEY, POLYGONSCAN_API_KEY, POLYGON_AMOY_RPC, POLYGON_MAINNET_RPC } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.21',
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    hardhat: {},
    amoy: {
      chainId: 80002,
      url: POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    polygon: {
      chainId: 137,
      url: POLYGON_MAINNET_RPC || 'https://polygon-rpc.com',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY || '',
      polygonAmoy: POLYGONSCAN_API_KEY || ''
    },
    customChains: [
      // In case your hardhat-verify version doesn't yet include Polygon Amoy,
      // we define it explicitly. Safe to keep even if supported natively.
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        }
      }
    ]
  }
};
