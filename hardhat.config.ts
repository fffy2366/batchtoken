/* eslint-disable node/no-missing-import */
import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "@openzeppelin/hardhat-upgrades";
import "./scripts/tasks";

dotenv.config();
const MNEMONIC = process.env.MNEMONIC;
const MNEMONIC_IPX = process.env.MNEMONIC_IPX;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// eslint-disable-next-line node/no-missing-require
// require("./scripts/tasks");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    testnet: {
      // https://docs.binance.org/smart-chain/developer/rpc.html
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      blockGasLimit: 0x1fffffffffffff,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      accounts: { mnemonic: MNEMONIC },
    },
    testnetIpx: {
      // account[0]: 0xfb66Ef84F64995b443A280062a565F967a6A9eA7
      // account[3]: 0x1D5Fb9Dc2f88228d05aDDf5F47c352F145593B98
      // https://docs.binance.org/smart-chain/developer/rpc.html
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      blockGasLimit: 0x1fffffffffffff,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: MNEMONIC_IPX,
        count: 105,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
      },
    },
    mainnet: {
      // url: "https://bsc-dataseed1.ninicoin.io/",
      url: "https://bsc-dataseed1.binance.org/",
      // url: "https://bsc-dataseed2.binance.org/",
      chainId: 56,
      gasPrice: 5000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: process.env.BSC_API_KEY,
  },
};

export default config;
