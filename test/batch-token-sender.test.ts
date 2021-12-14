/* eslint-disable node/no-extraneous-import */
/* eslint-disable node/no-missing-import */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line node/no-extraneous-import
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { MaxUint256 } from '@ethersproject/constants';
import BatchTokenSender from "../contracts/abis/BatchTokenSender.json";
import ERC20 from "../contracts/abis/ERC20.json";
import isZero from "../utils/int";
const NETWORK = "testnet" // mainnet testnet
const isMainnet = NETWORK !== "testnet";
const SENDER_ADDRESS = isMainnet ? "0x2D973C629966D354B65040B0f15c220e62dEA8DD" : "0x7172d0BF2375307bcCb202ab32a4C52496654b1A";
const TOKEN_ADDRESS = isMainnet ? "0x55d398326f99059fF775485246999027B3197955" : "0xcFDE30EA6F0E922BD60C964cC15A780262F1c7Ba";
const providerRpc = isMainnet ? "https://bsc-dataseed4.defibit.io" : "https://data-seed-prebsc-1-s1.binance.org:8545";
const GAS_PRICE = isMainnet ? 5000000000 : 10000000000;
/* eslint-disable @typescript-eslint/no-floating-promises */
process.env.DEBUG = 'test:*'
// eslint-disable-next-line node/no-extraneous-require
const debug = require("debug")("test:batch:token:sender");
async function gas(contract: any, parameters: any, options: any): Promise<any> {
  return contract.estimateGas[parameters.methodName](
    ...parameters.args,
    options
  );
}
describe("BatchTokenSenderTest", () => {
  /**
   * DEBUG=test:* npx hardhat test  test/batch-token-sender.test.ts
   */
  it("testBulkSendCoinWithSameValue", async () => {
    const amount = new BigNumber(0.1).multipliedBy(1e18);
    const receivers = [
      "0x0000000000000000000000000000000000000000",
    ];
    const totalAmount = amount.multipliedBy(receivers.length);
    for (const receiver of receivers) {
      // totalAmount += receiver
      const isAddress = ethers.utils.isAddress(receiver);
      if (!isAddress) {
        debug("不是合法地址: %s", receiver);
        return;
      }
    }

    const provider = new ethers.providers.JsonRpcProvider(providerRpc)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as any, provider);

    const tokenContract = new ethers.Contract(
      TOKEN_ADDRESS,
      ERC20,
      provider
    ).connect(wallet);
    const senderContract = new ethers.Contract(
      SENDER_ADDRESS,
      BatchTokenSender,
      provider
    ).connect(wallet);
    let isAllow = await tokenContract.allowance(wallet.address, SENDER_ADDRESS);
    debug("isAllow %o", isAllow);
    isAllow = new BigNumber(isAllow.toString());
    if (isAllow.comparedTo(totalAmount) < 0) {
      debug("start approve");
      await tokenContract.approve(
        SENDER_ADDRESS,
        MaxUint256
      );
    }

    debug("start send");
    const parameters = {
      value: "10000000000000000",
      methodName: "bulkSendCoinWithSameValue",
      args: [TOKEN_ADDRESS, receivers, "0x" + amount.toString(16)],
    };
    const value2 = parameters.value;
    const options = !value2 || isZero(value2) ? {} : { value: value2 };
    const gasLimit = await gas(senderContract, parameters, options);
    debug("gasLimit is %o", gasLimit.toString());
    const overrides = {
      gasPrice: GAS_PRICE,
      gasLimit: gasLimit || 21000,
      value: parameters.value,
    };
    const res = await senderContract.bulkSendCoinWithSameValue(
      TOKEN_ADDRESS,
      receivers,
      "0x" + amount.toString(16),
      overrides
    );
    debug("res hash is %s, nonce %d", res.hash, res.nonce);
    const receipt = await res.wait();
    debug(
      "receipt tx is %s, status %d, confirmations %d",
      receipt.transactionHash,
      receipt.status,
      receipt.confirmations
    );
  }).timeout(100000);
});
