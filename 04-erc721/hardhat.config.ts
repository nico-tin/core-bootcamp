import path from 'path'
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    core_testnet: {
      accounts: [
        PRIVATE_KEY as string
      ],
      url: 'https://rpc.test2.btcs.network',
      chainId: 1114
    }
  }
};

export default config;
