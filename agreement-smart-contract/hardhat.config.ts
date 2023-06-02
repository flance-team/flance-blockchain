import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!INFURA_API_KEY) {
  throw new Error(
    "Missing environment : Infura API key, please check your .env file"
  );
}

if (!WALLET_PRIVATE_KEY) {
  throw new Error(
    "Missing environment : Private key, please check your .env file"
  );
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: { tests: "tests" },
  networks: {
    hardhat: {},
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
