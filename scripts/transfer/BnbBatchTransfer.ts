// eslint-disable-next-line node/no-extraneous-import
import BigNumber from "bignumber.js";
import { ethers } from "hardhat";

// eslint-disable-next-line node/no-extraneous-import
import { MaxUint256 } from "@ethersproject/constants";
import BatchTokenSender from "../../contracts/abis/BatchTokenSender.json";
import ERC20 from "../../contracts/abis/ERC20.json";
// eslint-disable-next-line node/no-missing-import
import isZero from "../../utils/int";
// eslint-disable-next-line node/no-missing-import
import { TEST_SENDER_ADDRESS } from "../../utils/config";
const hre = require("hardhat");

const LIMIT = 255; // > 1
const AMOUNT = 0.01;

// npx hardhat --network testnetIpx run scripts/transfer/BnbBatchTransfer.ts
async function gas(contract: any, parameters: any, options: any): Promise<any> {
  return contract.estimateGas[parameters.methodName](
    ...parameters.args,
    options
  );
}
async function bulkSendETHWithSameValue(
  isTest: boolean,
  toAddresses: string[],
  amount: BigNumber
) {
  const GAS_PRICE = isTest ? 10000000000 : 5000000000;
  // WBNB
  const TOKEN_ADDRESS = isTest
    ? "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
    : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const SENDER_ADDRESS = isTest
    ? TEST_SENDER_ADDRESS
    : "0x2D973C629966D354B65040B0f15c220e62dEA8DD";

  const totalAmount = amount
    .multipliedBy(toAddresses.length - 1)
    .plus("10000000000000000");
  // console.log("totalAmount is %s", totalAmount.toString());
  // console.log("toAddresses is %j", toAddresses);
  const accounts = await ethers.getSigners();
  const wallet = accounts[0];
  console.log("wallet address is %s", wallet.address);
  const tokenContract = await ethers.getContractAt(ERC20, TOKEN_ADDRESS);
  const senderContract = await ethers.getContractAt(
    BatchTokenSender,
    SENDER_ADDRESS
  );
  let isAllow = await tokenContract.allowance(wallet.address, SENDER_ADDRESS);
  // console.log("isAllow %o", isAllow);
  isAllow = new BigNumber(isAllow.toString());
  if (isAllow.comparedTo(totalAmount) < 0) {
    console.log("start approve");
    const approve = await tokenContract.approve(SENDER_ADDRESS, MaxUint256);
    await approve.wait();
  }
  console.log("start send");
  const parameters = {
    value: "0x" + totalAmount.toString(16),
    methodName: "bulkSendETHWithSameValue",
    args: [toAddresses, "0x" + amount.toString(16)],
  };
  // console.log("parameters is %o", parameters);
  const value2 = parameters.value;
  const options = !value2 || isZero(value2) ? {} : { value: value2 };
  const gasLimit = await gas(senderContract, parameters, options);
  console.log("gasLimit is %o", gasLimit.toString());
  const overrides = {
    gasPrice: GAS_PRICE,
    gasLimit: gasLimit || 21000,
    value: parameters.value,
  };
  const res = await senderContract.bulkSendETHWithSameValue(
    toAddresses,
    "0x" + amount.toString(16),
    overrides
  );
  console.log("res hash is %s, nonce %d", res.hash, res.nonce);
  const receipt = await res.wait();
  console.log(
    "receipt tx is %s, status %d, confirmations %d",
    receipt.transactionHash,
    receipt.status,
    receipt.confirmations
  );
}
async function main() {
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;
  console.log("networkName %s, chainId is %d", networkName, chainId);
  const isTest = chainId === 97;
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log("address: ", account.address);
  }

  const toAddresses = [];
  let toAddress = ["0x0000000000000000000000000000000000000000"];
  for (let i = 3; i < accounts.length; i++) {
    const receiver = accounts[i].address;
    const isAddress = ethers.utils.isAddress(receiver);
    if (!isAddress) {
      console.log("不是合法地址: %s", receiver);
      return;
    }
    toAddress.push(receiver);
    if (toAddress.length >= LIMIT) {
      toAddresses.push(toAddress);
      toAddress = ["0x0000000000000000000000000000000000000000"];
    } else {
      if (i === accounts.length - 1) {
        toAddresses.push(toAddress);
      }
    }
  }
  // console.log("toAddresses[0] is %o", toAddresses[0]);
  // console.log("toAddresses[1] is %o", toAddresses[1]);
  // 每个地址数量
  const amount = new BigNumber(AMOUNT).multipliedBy(1e18);
  for (let i = 0; i < toAddresses.length; i++) {
    const addresses = toAddresses[i];
    await bulkSendETHWithSameValue(isTest, addresses, amount);
  }

  console.log("all success");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
