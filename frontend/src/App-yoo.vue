<template>
  <div><button @click="aaa">stake</button></div>
</template>

<script>
import Web3 from "web3";
export default {
  name: "App",
  data() {
    return {
      // 基础数据
      unit: Web3.utils.toWei("1", "ether"),
      web3: null,
      account: null,
      balance: 0,
      balnceEth: null,
      chainId: "",
      isConnect: false,
      // 合约对象
      busd: null,
      yoobusd: null,
      farm: null,
      acs: null,
      nft: null,
      nftFarm: null,
      yoo: null,
      nftMarket: null,
      // 合约地址
      defaultAddress:
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      busdAddress: "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47",
      yoobusdAddress: "0x0d25FE004910e066CAB2C4fDcdDD74791b8d41f9",
      farmAddress: "0xdB6fBd5A9aa82084aeaa57B45B91f2B3b037344f",
      acsAddress: "0xf810d678612381064a2eff1484562301fc051a8b",
      nftAddress: "0x1f49390bdCE1Bf4A28AC0ADB8Bf72d3e3256732f",
      nftFarmAddress: "0x090D6eE1bb73f1e8891997f74f573B11D7D287f9",
      yooAddress: "0x18A32fec9c8fF68B747f6c5b1CC3099AA6783059",
      nftMarketAddress: "0x423B836D372C208d13a3E4B3AA5d11AD3F8C8b87",

      // 合约abi
      busdAbi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_initialAmount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_tokenName",
              type: "string",
            },
            {
              internalType: "uint8",
              name: "_decimalUnits",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "_tokenSymbol",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "allocateTo",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "_spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "dst",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "src",
              type: "address",
            },
            {
              internalType: "address",
              name: "dst",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      yoobusdAbi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_token",
              type: "address",
            },
            {
              internalType: "address",
              name: "_controller",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "available",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "balance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "controller",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "depositAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "earn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getPricePerFullShare",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "governance",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "reserve",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "harvest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "max",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "min",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_controller",
              type: "address",
            },
          ],
          name: "setController",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_governance",
              type: "address",
            },
          ],
          name: "setGovernance",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_min",
              type: "uint256",
            },
          ],
          name: "setMin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [
            {
              internalType: "contract IERC20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_shares",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      farmAbi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "lpToken",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Deposit",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "lpToken",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdraw",
          type: "event",
        },
        {
          inputs: [],
          name: "REWARD_DENOMINATOR",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_reward",
              type: "uint256",
            },
          ],
          name: "addAdditionalRewards",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "additionalRewards",
          outputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "reward",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "boostFactor",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "boostToken",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "calculateWeight",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "deleteAdditionalRewards",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
          ],
          name: "harvest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "harvestFee",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "harvestFeeAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_timelock",
              type: "address",
            },
            {
              internalType: "address",
              name: "_acs",
              type: "address",
            },
            {
              internalType: "address",
              name: "_dev",
              type: "address",
            },
            {
              internalType: "address",
              name: "_strategyS0V3",
              type: "address",
            },
            {
              internalType: "address",
              name: "_vault0",
              type: "address",
            },
            {
              internalType: "address",
              name: "_treasury",
              type: "address",
            },
          ],
          name: "initialize",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "maxBoost",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "pendingSushi",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "poolInfo",
          outputs: [
            {
              internalType: "uint256",
              name: "totalWeight",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "allocPoint",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "lastRewardBlock",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "accSushiPerShare",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_allocPoint",
              type: "uint256",
            },
          ],
          name: "set",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_boostFactor",
              type: "uint256",
            },
          ],
          name: "setBoostFactor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_harvestFee",
              type: "uint256",
            },
          ],
          name: "setHarvestFee",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_harvestFeeAddress",
              type: "address",
            },
          ],
          name: "setHarvestFeeAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_maxBoost",
              type: "uint256",
            },
          ],
          name: "setMaxBoost",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_strategist",
              type: "address",
            },
          ],
          name: "setStrategist",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_sushiPerBlock",
              type: "uint256",
            },
          ],
          name: "setSushiPerBlock",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "strategist",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "sushi",
          outputs: [
            {
              internalType: "contract ERC20Mintable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "sushiPerBlock",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalAllocPoint",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
          ],
          name: "updatePool",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userInfo",
          outputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "weight",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rewardDebt",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rewardCredit",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_lpToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      acsAbi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "MinterAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "MinterRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "addMinter",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "isMinter",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceMinter",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      nftAbi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_key",
              type: "address",
            },
            {
              internalType: "address",
              name: "_lop",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "maxSupply",
              type: "uint256",
            },
          ],
          name: "BoxAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "BuyBuilding",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "targetId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "exp",
              type: "uint256",
            },
          ],
          name: "LevelUp",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "cid",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "strength",
              type: "uint256",
            },
          ],
          name: "OpenBox",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "TransferBatch",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "TransferSingle",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "value",
              type: "string",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "URI",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "tokenAddr",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdraw",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxSupply",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "strength",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rarity",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "exp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "hashPrice",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "series",
              type: "uint256",
            },
          ],
          name: "addBox",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "accounts",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
          ],
          name: "balanceOfBatch",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "boxes",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "burnBatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "buyBuilding",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "strength",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rarity",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "exp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "hashPrice",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "series",
              type: "uint256",
            },
          ],
          name: "changeFighter",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "circulatingSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "fighters",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "strength",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rarity",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "exp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "hashPrice",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "series",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "ids_",
              type: "uint256[]",
            },
          ],
          name: "getCirculatingSupply",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getFighter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "ids_",
              type: "uint256[]",
            },
          ],
          name: "getTotalSupply",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "level",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "fromIds",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
            {
              internalType: "uint256",
              name: "targetId",
              type: "uint256",
            },
          ],
          name: "levelUp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "nextId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "openBox",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeBatchTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "setURI",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "strength",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "uri",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenAddr",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      nftFarmAbi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_NFT",
              type: "address",
            },
            {
              internalType: "address",
              name: "_LOS",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "Paused",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Recovered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "reward",
              type: "uint256",
            },
          ],
          name: "RewardAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "reward",
              type: "uint256",
            },
          ],
          name: "RewardPaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "newDuration",
              type: "uint256",
            },
          ],
          name: "RewardsDurationUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Staked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "Unpaused",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdrawn",
          type: "event",
        },
        {
          inputs: [],
          name: "LOS",
          outputs: [
            {
              internalType: "contract IERC20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "NFT",
          outputs: [
            {
              internalType: "contract IERC1155",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "_totalStrength",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceByTokenIdOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_LOS",
              type: "address",
            },
            {
              internalType: "address",
              name: "_NFT",
              type: "address",
            },
          ],
          name: "changeAddresses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "earned",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "exit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "fee",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNftTokens",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getReward",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getRewardForDuration",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lastTimeRewardApplicable",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lastUpdateTime",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "b",
              type: "uint256",
            },
          ],
          name: "min",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "nftTokenMap",
          outputs: [
            {
              internalType: "bool",
              name: "hasValue",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "nftTokens",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "reward",
              type: "uint256",
            },
          ],
          name: "notifyRewardAmount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "onERC1155Received",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "paused",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "periodFinish",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "pureStrengthWeight",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenAmount",
              type: "uint256",
            },
          ],
          name: "recoverERC20",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "rewardPerToken",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rewardPerTokenStored",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rewardRate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "rewards",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rewardsDuration",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rewardsDuration",
              type: "uint256",
            },
          ],
          name: "setRewardsDuration",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_series",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "supported",
              type: "bool",
            },
          ],
          name: "setSupportedSeries",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_tokenMaxAmount",
              type: "uint256",
            },
          ],
          name: "setTokenMaxAmount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_withdrawRewardFee",
              type: "uint256",
            },
          ],
          name: "setWithdrawRewardFee",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "tokenIds",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
          ],
          name: "stake",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "strengthWeight",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tokenMaxAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userRewardPerTokenPaid",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "tokenIds",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
          ],
          name: "withdrawNFT",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawRewardFee",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      yooAbi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "MinterAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "MinterRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "addMinter",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "burnFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "isMinter",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceMinter",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      nftMarketAbi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "busdToken_",
              type: "address",
            },
            {
              internalType: "address",
              name: "nonFungibleToken_",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "fromAddress",
              type: "address",
            },
          ],
          name: "BidWithdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "fromAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "toAddress",
              type: "address",
            },
          ],
          name: "ItemBought",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
          ],
          name: "ItemNoLongerForSale",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "minValue",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "toAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "ItemOffered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "fromAddress",
              type: "address",
            },
          ],
          name: "NewBidEntered",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
          ],
          name: "acceptBid",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "busdTokenAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "buyItem",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "enterBid",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "itemBids",
          outputs: [
            {
              internalType: "bool",
              name: "hasBid",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "itemIndex",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "bidder",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
          ],
          name: "itemNoLongerForSale",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "itemsOfferedForSale",
          outputs: [
            {
              internalType: "bool",
              name: "isForSale",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "minValue",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "onlySellTo",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "from",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "to",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nextOrderId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nonFungibleTokenAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minSalePriceInWei",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isForSale",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "durationDays",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "offerItemForSale",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minSalePriceInWei",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "toAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "durationDays",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "offerItemForSaleToAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "pendingWithdrawals",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
          ],
          name: "withdrawBid",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    };
  },
  components: {},
  created() {
    console.log("初始Vue");
    window.ContractVueObj = this; // 吧this记录到window
    this.connectWeb3();
  },
  methods: {
    aaa() {
      this.Deposite_nft2nftfarm([17], [1], function () {});
    },
    async connectWeb3() {
      // 监听后得到账户后连接

      let func = async function (accounts) {
        this.account = accounts[0];
        if (this.isConnect) {
          console.log("合约账户变化");
          this.connectContract();
        }
      };
      /* 新版的方式 */
      var web3Provider;
      if (window.ethereum) {
        // 添加监听
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum.on("accountsChanged", func);
        window.ethereum.on("chainChanged", (chainId1) => {
          console.log("连变化");
          this.chainId = chainId1;
          func([this.account]);
        });
        // 初始provider
        web3Provider = window.ethereum;
        try {
          // 请求用户授权
          await window.ethereum.enable();
        } catch (error) {
          // 用户不授权时
          console.error("User denied account access");
        }
      } else if (window.web3) {
        // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
      } else {
        web3Provider = new Web3.providers.HttpProvider(
          "https://data-seed-prebsc-1-s3.binance.org:8545/"
        );
      }
      this.web3 = new Web3(web3Provider); //web3就是你需要的web3实例

      this.web3.eth.getAccounts(function (error, result) {
        if (!error) console.log(result); //授权成功后result能正常获取到账号了
      });
      this.isConnect = true; // 已连接状态
      this.account = window.ethereum.selectedAddress || null;
      this.chainId = window.ethereum.chainId || null;
      if (this.account) {
        // 之前有数据，直接连接合约
        this.connectContract();
      }
    },
    // 连接合约
    async connectContract() {
      // busd
      this.busd = new this.web3.eth.Contract(this.busdAbi, this.busdAddress); // 0x8301f2213c0eed49a7e28ae4c3e91722919b8b47
      console.log("busd合约：", this.busd);

      // yoobusd
      this.yoobusd = new this.web3.eth.Contract(
        this.yoobusdAbi,
        this.yoobusdAddress
      );
      console.log("yoobusd合约：", this.yoobusd);

      // farm
      this.farm = new this.web3.eth.Contract(this.farmAbi, this.farmAddress);
      console.log("farm合约：", this.farm);

      // acs
      this.acs = new this.web3.eth.Contract(this.acsAbi, this.acsAddress);
      console.log("acs合约：", this.acs);

      // nft
      this.nft = new this.web3.eth.Contract(this.nftAbi, this.nftAddress);
      console.log("nft合约:", this.nft);

      // nftFarm
      this.nftFarm = new this.web3.eth.Contract(
        this.nftFarmAbi,
        this.nftFarmAddress
      );
      console.log("nftFarm合约:", this.nft);

      // yoo
      this.yoo = new this.web3.eth.Contract(this.yooAbi, this.yooAddress);
      console.log("yoo合约：", this.yoo);

      // nftMarket
      this.nftMarket = new this.web3.eth.Contract(
        this.nftMarketAbi,
        this.nftMarketAddress
      );
      console.log("nftMarket合约:", this.nft);

      // 检测合约是否连上
      if (this.isConnectContracts()) {
        // 获取余额
        this.balance = await this.web3.eth.getBalance(this.account);
        this.balanceEth = this.web3.utils.fromWei(this.balance, "ether");
        // 监听事件
        this.HandlerWithdraw2nft();
        this.HandlerDeposit2nftfarm();
        console.log(
          "钱包地址和balance:",
          this.account,
          this.balance,
          this.balanceEth
        );
      }
    },

    // busd
    BalanceOf_busd(callback = null) {
      // 余额:busd
      this.busd.methods.balanceOf(this.account).call((err, res) => {
        console.log("busd余额:", res, err);
        if (callback) callback(err, res);
      });
    },
    Allowance_busd2yoobusd(callback = null) {
      // 检测授权:busd==>yoobusd 未授权res==0
      this.busd.methods
        .allowance(this.account, this.yoobusdAddress)
        .call((err, res) => {
          console.log("授权检测(busd=>yoobusd)：", res, err);
          if (callback) callback(err, res);
        });
    },
    Approve_busd2yooBusd(callback = null) {
      // 授权:busd==>yoobusd
      this.busd.methods
        .approve(this.yoobusdAddress, this.defaultAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("授权(busd=>yoobusd)：", res, err);
          if (callback) callback(err, res);
        });
    },
    Allowance_busd2nftMarket(callback = null) {
      // 检测授权:busd==>nftMarket 未授权res==0
      this.busd.methods
        .allowance(this.account, this.nftMarketAddress)
        .call((err, res) => {
          console.log("授权检测(busd=>nftMarket)：", res, err);
          if (callback) callback(err, res);
        });
    },
    Approve_busd2nftMarket(callback = null) {
      // 授权:busd==>nftMarket
      this.busd.methods
        .approve(this.nftMarketAddress, this.defaultAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("授权(busd=>nftMarket)：", res, err);
          if (callback) callback(err, res);
        });
    },

    // yoobusd
    BalanceOf_yoobusd(callback = null) {
      // 余额:yoobusd
      this.yoobusd.methods.balanceOf(this.account).call((err, res) => {
        console.log("yoobusd余额:", res, err);
        if (callback) callback(err, res);
      });
    },
    Deposit_busd2yoobusd(amount, callback = null) {
      // busd兑换yoobusd
      this.yoobusd.methods
        .deposit(Web3.utils.toWei(amount.toString(), "ether").toString())
        .send({ from: this.account }, (err, res) => {
          console.log("busd兑换yoobusd:", res, err);
          if (callback) callback(err, res);
        });
    },
    Withdraw_yoobusd2busd(amount, callback = null) {
      // yoobusd兑换busd
      this.yoobusd.methods
        .withdraw(Web3.utils.toWei(amount.toString(), "ether").toString())
        .send({ from: this.account }, (err, res) => {
          console.log("yoobusd兑换busd:", res, err);
          if (callback) callback(err, res);
        });
    },
    Allowance_yoobusd2farm(callback = null) {
      // 检测授权:yoobusd==>farm 未授权res==0
      this.yoobusd.methods
        .allowance(this.account, this.farmAddress)
        .call((err, res) => {
          console.log("授权检测(yoobusd=>farm)：", res, err);
          if (callback) callback(err, res);
        });
    },
    Approve_yoobusd2farm(callback = null) {
      // 授权:yoobusd==>farm
      this.yoobusd.methods
        .approve(this.farmAddress, this.defaultAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("授权(yoobusd=>farm):", res, err);
          if (callback) callback(err, res);
        });
    },

    // farm相关方法
    Pending_acs(callback = null) {
      // 待收益:acs
      this.farm.methods
        .pendingSushi(this.yoobusdAddress, this.account)
        .call((err, res) => {
          console.log("待收益(acs)：", res, err);
          if (callback) callback(err, res);
        });
    },
    Havest_acs(callback = null) {
      // 收益:acs 手续费1：手续费不足会报错
      this.farm.methods
        .harvest(this.yoobusdAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("收益(acs):", res, err);
          if (callback) callback(err, res);
        });
    },
    BalanceOf_yoobusdInfarm(callback = null) {
      // 余额:yoobusd (已质押在farm里面的yoobusd)
      this.farm.methods
        .userInfo(this.yoobusdAddress, this.account)
        .call((err, res) => {
          console.log("质押在farm里的余额(yoo):", res, err);
          if (callback) callback(err, res);
        });
    },
    Deposit_yoobusd2farm(amount, callback = null) {
      // 质押：yoobusd==>farm 产生acs
      this.farm.methods
        .deposit(
          this.yoobusdAddress,
          Web3.utils.toWei(amount.toString(), "ether").toString()
        )
        .send({ from: this.account }, (err, res) => {
          console.log("质押(yoobusd==>farm):", res, err);
          if (callback) callback(err, res);
        });
    },
    Withdraw_farm2yoobusd(amount, callback = null) {
      // 提现:yoo (赎回质押在farm里面的yoo)
      this.farm.methods
        .withdraw(
          this.yoobusdAddress,
          Web3.utils.toWei(amount.toString(), "ether").toString()
        )
        .send({ from: this.account }, (err, res) => {
          console.log("赎回质押在farm里的yoobusd:", res, err);
          if (callback) callback(err, res);
        });
    },

    // acs相关方法
    BalanceOf_acs(callback = null) {
      // 余额:acs
      this.acs.methods.balanceOf(this.account).call((err, res) => {
        console.log("acs余额:", res, err);
        if (callback) callback(err, res);
      });
    },
    Allowance_acs2nft(callback = null) {
      // 检测授权:acs==>nft 未授权res==0
      this.acs.methods
        .allowance(this.account, this.nftAddress)
        .call((err, res) => {
          console.log("检测授权(acs==>nft):", res, err);
          if (callback) callback(err, res);
        });
    },
    Approve_acs2nft(callback = null) {
      // 授权:acs==>nft
      this.acs.methods
        .approve(this.nftAddress, this.defaultAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("开盲盒授权(acs==>nft)：", res, err);
          if (callback) callback(err, res);
        });
    },

    // nft相关方法  nft上面存储着用户的宠物、建筑
    OpenBox(amount, callback = null) {
      // 开盲盒:acs==>nft(获取宠物)  目前合约限制一次性只能开1~10个
      this.nft.methods
        .openBox(Web3.utils.toWei(amount.toString(), "ether").toString())
        .send({ from: this.account, gas: 1000000 }, (err, res) => {
          console.log("开盲盒一次:", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerOpenBox(callback = null) {
      // 监听开盲盒结果 id 是 0-24  0没抽中 1-24 分别对应excel的宠物
      this.nft.events
        .OpenBox({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    BuyBuilding(id, amount = 1, callback = null) {
      // 购买建筑:yoo==>nft
      this.nft.methods
        .buyBuilding(id, amount)
        .send({ from: this.account }, (err, res) => {
          console.log("购买建筑(yoo==>nft):", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerBuyBuilding(callback = null) {
      // 监听购买建筑结果 id 是 0,25-40  0失败 25~40 分别对应excel的建筑
      this.nft.events
        .BuyBuilding({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    LevelUp(fromIds, amounts, targetId, callback = null) {
      // 宠物升级
      this.nft.methods
        .levelUp(fromIds, amounts, targetId)
        .send({ from: this.account }, (err, res) => {
          console.log("宠物升级:", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerLevelUp(callback = null) {
      // 监听宠物升级结果
      this.nft.events
        .LevelUp({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    BalanceOf_nft(ids, callback = null) {
      // 根据ID批量查询 宠物[1,2...24]、建筑[25,26...40]
      let accounts = [];
      for (let i = 0; i < ids.length; i++) {
        accounts.push(this.account);
      }
      this.nft.methods.balanceOfBatch(accounts, ids).call((err, res) => {
        console.log("根据ID批量查询(nft):", res, err);
        if (callback) callback(err, res);
      });
    },
    CirculatingSupply_buildings(ids, callback = null) {
      // 链上流通量：build
      this.nft.methods.getCirculatingSupply(ids).call((err, res) => {
        console.log("链上流通量(build):", res, err);
        if (callback) callback(err, res);
      });
    },
    Total_buildings(ids, callback = null) {
      // 总供应量：build
      this.nft.methods.getTotalSupply(ids).call((err, res) => {
        console.log("总供应量(build):", res, err);
        if (callback) callback(err, res);
      });
    },
    Allowance_nft2nftfarm(callback = null) {
      // 授权检测:nft==>nftfarm res = false/true
      this.nft.methods
        .isApprovedForAll(this.account, this.nftFarmAddress)
        .call((err, res) => {
          console.log("授权检测(nft==>nftfarm):", res, err);
          if (callback) callback(err, res);
        });
    },
    async Approve_nft2nftfarm(callback = null) {
      // 授权:nft==>nftfarm
      await this.nft.methods
        .setApprovalForAll(this.nftFarmAddress, true)
        .send({ from: this.account }, (err, res) => {
          console.log("授权(nft==>nftfarm):", res, err);
          if (callback) callback(err, res);
        });
    },
    Allowance_nft2nftmarket(callback = null) {
      // 授权检测:nft==>nftmarket res = false/true
      this.nft.methods
        .isApprovedForAll(this.account, this.nftMarketAddress)
        .call((err, res) => {
          console.log("授权检测(nft==>nftmarket):", res, err);
          if (callback) callback(err, res);
        });
    },
    async Approve_nft2nftmarket(callback = null) {
      // 授权:nft==>nftmarket
      await this.nft.methods
        .setApprovalForAll(this.nftMarketAddress, true)
        .send({ from: this.account }, (err, res) => {
          console.log("授权(nft==>nftmarket):", res, err);
          if (callback) callback(err, res);
        });
    },

    // nftfarm相关方法(质押宠物[1,2...24]、建筑[25,26...40]产生yoo)
    Pending_yoo(callback = null) {
      // 待收益:yoo
      this.nftFarm.methods.earned(this.account).call((err, res) => {
        console.log("待收益(yoo):", res, err);
        if (callback) callback(err, res);
      });
    },
    async Havest_yoo(callback = null) {
      // 收益:yoo
      await this.nftFarm.methods
        .getReward()
        .send({ from: this.account }, (err, res) => {
          console.log("收益(yoo):", res, err);
          if (callback) callback(err, res);
        });
    },
    async Exit_nftfarm(callback = null) {
      // 获取收益并赎回
      await this.nftFarm.methods
        .exit()
        .send({ from: this.account }, (err, res) => {
          console.log("获取收益并赎回nft:", res, err);
          if (callback) callback(err, res);
        });
    },
    BalanceOf_nftInNftfarm(id, callback = null) {
      // 质押在nftfarm的宠物、建筑量
      this.nftFarm.methods
        .balanceByTokenIdOf(id, this.account)
        .call((err, res) => {
          console.log("质押在nftfarm的宠物、建筑数量:", res, err);
          if (callback) callback(err, res);
        });
    },
    async Deposite_nft2nftfarm(ids, amounts, callback = null) {
      // 质押:nft==>nftfarm
      await this.nftFarm.methods
        .stake(ids, amounts)
        .send({ from: this.account }, (err, res) => {
          console.log("质押(nft==>nftfarm):", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerDeposit2nftfarm(callback = null) {
      // 监听nft资产（宠物、建筑）质押结果
      this.nftFarm.events
        .Staked({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log("质押结果", event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    async Withdraw_nftfarm2nft(ids, amounts, callback = null) {
      // 赎回质押:nft
      await this.nftFarm.methods
        .withdrawNFT(ids, amounts)
        .send({ from: this.account }, (err, res) => {
          console.log("赎回(nftfarm==>nft):", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerWithdraw2nft(callback = null) {
      // 监听nft资产（宠物、建筑）赎回结果
      this.nftFarm.events
        .Withdrawn({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log("赎回结果", event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    Yield125_nftfarm(callback = null) {
      // 125天总合收益率
      this.nftFarm.methods.getRewardForDuration().call((err, res) => {
        console.log("固定期限内（125天）的总收益率:", res, err);
        if (callback) callback(err, res);
      });
    },
    Yield_nftfarm(callback = null) {
      // 收益率
      this.nftFarm.methods.rewards(this.account).call((err, res) => {
        console.log("收益率:", res, err);
        if (callback) callback(err, res);
      });
    },

    // yoo相关方法
    BalanceOf_yoo(callback = null) {
      // 余额:yoo
      this.yoo.methods.balanceOf(this.account).call((err, res) => {
        console.log("yoo余额:", res, err);
        if (callback) callback(err, res);
      });
    },
    Allowance_yoo2nft(callback = null) {
      // 检测授权:yoo==>nft 未授权res==0
      this.yoo.methods
        .allowance(this.account, this.nftAddress)
        .call((err, res) => {
          console.log("检测授权(yoo==>nft):", res, err);
          if (callback) callback(err, res);
        });
    },
    Approve_yoo2nft(callback = null) {
      // 授权:yoo==>nft
      this.yoo.methods
        .approve(this.nftAddress, this.defaultAddress)
        .send({ from: this.account }, (err, res) => {
          console.log("购买建筑、交易授权(yoo==>nft)：", res, err);
          if (callback) callback(err, res);
        });
    },

    // nftMarket相关方法
    Create_order(id, price, durationDays = 0, amount = 1, callback = null) {
      // 挂单
      this.nftMarket.methods
        .offerItemForSale(
          id,
          Web3.utils.toWei(price.toString(), "ether").toString(),
          true,
          durationDays,
          amount
        )
        .send({ from: this.account }, (err, res) => {
          console.log("挂单(build,pet):", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerCreateOrder(callback = null) {
      // 监听创建订单的结果
      this.nftMarket.events
        .ItemOffered({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    Cancel_order(orderId, callback = null) {
      // 取消订单
      this.nftMarket.methods
        .itemNoLongerForSale(orderId)
        .send({ from: this.account }, (err, res) => {
          console.log("取消订单(build,pet):", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerCancelOrder(callback = null) {
      // 监听取消订单的结果
      this.nftMarket.events
        .ItemNoLongerForSale({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },
    BuyItem(orderId, bid, callback = null) {
      // 交易
      this.nftMarket.methods
        .buyItem(orderId, Web3.utils.toWei(bid.toString(), "ether").toString())
        .send({ from: this.account }, (err, res) => {
          console.log("交易:", res, err);
          if (callback) callback(err, res);
        });
    },
    HandlerBuyItem(callback = null) {
      // 监听交易的结果
      this.nftMarket.events
        .ItemBought({ filter: { user: this.account } })
        .on("data", function (event) {
          console.log(event.returnValues);
          if (callback) callback(event.returnValues);
        })
        .on("changed", function (event) {
          console.log("changed:", event);
        })
        .on("error", console.error);
    },

    // 检测是否连接合约
    isConnectContracts() {
      if (!this.account) {
        console.log("没有找到account");
        this.connectWeb3();
        return false;
      }
      if (
        !this.busd ||
        !this.yoobusd ||
        !this.farm ||
        !this.acs ||
        !this.nft ||
        !this.nftFarm ||
        !this.yoo ||
        !this.nftMarket
      ) {
        console.log("没有连相关合约");
        this.connectContract();
        return false;
      }
      return true;
    },
  },
};
</script>
