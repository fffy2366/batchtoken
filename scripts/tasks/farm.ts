/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-extraneous-import */
import moment from "moment";
import BigNumber from "bignumber.js";
import { Signer } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { Api } from "../../utils/api";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment as HRE } from "hardhat/types";

import {
  TEST_HY_TOKEN_ADDRESS,
  TEST_KR_TOKEN_ADDRESS,
  TEST_STARSHIP_FARM_ADDRESS,
  TEST_TI_TOKEN_ADDRESS,
  TEST_TOKEN_RECEIVE_ADDRESS,
} from "../../utils/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import ERC20 from "../../utils/abis/ERC20.json";
const receiveAbi = require("../../utils/abis/TokenReceiverUpgradeable.json");
const farmAbi = require("../../utils/abis/StarshipFarmUpgradeable.json");
const CONCURRENCY = 10;

// npx hardhat --network testnetIpx  farm --action accounts --from 4 --to 5
task("farm", "Farm")
  .addParam("action", "Farm action", undefined, types.string, false)
  .addParam("from", "from index", undefined, types.int, true)
  .addParam("to", "to index", undefined, types.int, true)
  .setAction(async (taskArgs, hre) => {
    //
    const action = taskArgs.action as
      | "accounts"
      | "receive"
      | "deposit"
      | "login"
      | "walletMe";
    const accounts = await hre.ethers.getSigners();
    const pres = [];
    let pre = [];
    const from = taskArgs.from ?? 0;
    const to = taskArgs.to ?? accounts.length;

    const farm = new Farm();
    if (!(farm[action] && typeof farm[action] === "function")) {
      console.error("%s not a function", action);
      return;
    }
    for (let i = from; i < to; i++) {
      const wallet = accounts[i];
      pre.push(farm[action](i, wallet, hre));

      if (pre.length >= CONCURRENCY) {
        pres.push(pre);
        pre = [];
      } else if (i === to - 1) {
        pres.push(pre);
        pre = [];
      }
    }
    for (const pre of pres) {
      // eslint-disable-next-line new-cap
      await Promise.all(pre)
        .then(function () {
          // console.log("success");
        })
        .catch(function (err: any) {
          console.error(err);
        });
    }
  });

class Farm {
  async receive(index: number, wallet: Signer, hre: HRE) {
    const TokenReceive = await new hre.ethers.Contract(
      TEST_TOKEN_RECEIVE_ADDRESS,
      receiveAbi.abi
    ).connect(wallet);
    const token1 = "0x363e894a202C26E6cE7883BcF42EF3Ba50B637e4";
    const token2 = "0x1Df4E5a814249aEb8C73dcEd7773aac634225619";
    const token3 = "0x1B89E8E236F7F799F4C2F0647f85A18050174198";
    const amount = "10000000000000000000000";
    const res1 = await TokenReceive.receiveToken(token1, amount);
    await res1.wait();
    const res2 = await TokenReceive.receiveToken(token2, amount);
    await res2.wait();
    const res3 = await TokenReceive.receiveToken(token3, amount);
    await res3.wait();
  }

  async deposit(index: number, wallet: SignerWithAddress, hre: HRE) {
    const HY = await new hre.ethers.Contract(
      TEST_HY_TOKEN_ADDRESS,
      ERC20
    ).connect(wallet);
    const TI = await new hre.ethers.Contract(
      TEST_TI_TOKEN_ADDRESS,
      ERC20
    ).connect(wallet);
    const KR = await new hre.ethers.Contract(
      TEST_KR_TOKEN_ADDRESS,
      ERC20
    ).connect(wallet);

    const Farm = await new hre.ethers.Contract(
      TEST_STARSHIP_FARM_ADDRESS,
      farmAbi.abi
    ).connect(wallet);
    const amount = "20000000000000000000000";
    const tokens = [HY, TI, KR];
    for (const TOKEN of tokens) {
      let isAllow = await TOKEN.allowance(
        wallet.address,
        TEST_STARSHIP_FARM_ADDRESS
      );
      // console.log("isAllow %o", isAllow);
      isAllow = new BigNumber(isAllow.toString());
      if (isAllow.comparedTo(amount) < 0) {
        console.log("start approve");
        const approve = await TOKEN.approve(
          TEST_STARSHIP_FARM_ADDRESS,
          MaxUint256
        );
        await approve.wait();
      }
    }

    const res = await Farm.deposit(amount, amount, amount);
    await res.wait();
  }

  async login(index: number, wallet: SignerWithAddress, hre: HRE) {
    const ts = moment().unix() + "";
    const msg = "Sign this message to login meta universe DApp." + ts;

    const signature = await wallet.signMessage(msg);
    const api = new Api();
    await api.login(wallet.address, signature, ts);
    // const loginResponse = await api.login(wallet.address, signature, ts);
    // const walletMe = await api.walletMe();
    // console.log("address is %s,token is %s", wallet.address, loginResponse);
    // console.log("wallet %o", walletMe);
    // ship build
    // await this.build(api);
    // ship synthesis
    // await this.synthesis(api);
    // TODO: farm
    return api;
  }

  async accounts(index: number, wallet: SignerWithAddress) {
    console.log("index %d, address is %s", index, wallet.address);
  }

  async build(api: Api) {
    const clazzes = [1, 2, 3];
    for (let i = 0; i < 3; i++) {
      for (const clazz of clazzes) {
        const buildRes = await api.build(clazz);
        console.log("buildRes is %o", buildRes);
      }
    }
  }

  async synthesis(api: Api) {
    const clazzes = [1, 2, 3];
    for (const clazz of clazzes) {
      const starships = await api.getStarshipList({
        start: 0,
        limit: 10,
        address: api.getAddress(),
        clazz,
        level: 1,
        dispatching: 0,
      });
      if (starships.length > 2) {
        const ids = [];
        for (const starship of starships) {
          ids.push(starship.id);
        }
        console.log("start synthesis");
        const synthesisRes = await api.synthesis(ids);
        console.log("synthesisRes is %o", synthesisRes);
      }
    }
  }

  async walletMe(index: number, wallet: SignerWithAddress, hre: HRE) {
    const api = await this.login(index, wallet, hre);
    const walletMe = await api.walletMe();
    if (walletMe.kr > 0) {
      console.log(walletMe);
    }
    return walletMe;
  }
}
