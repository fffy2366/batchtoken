/* eslint-disable prettier/prettier */
import { ethers, upgrades } from "hardhat";

async function main() {
    const BatchTokenSenderUpgradeable = await ethers.getContractFactory("BatchTokenSenderUpgradeable");
    const sender = await upgrades.deployProxy(BatchTokenSenderUpgradeable, [], { initializer: "initialize" });
    await sender.deployed();
    console.log("BatchTokenSenderUpgradeable deployed to:", sender.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 2021-12-05
// npx hardhat run scripts/BatchTokenSenderUpgradeable.ts
// BatchTokenSenderUpgradeable deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

// npx hardhat --network testnet run scripts/BatchTokenSenderUpgradeable.ts
// BatchTokenSenderUpgradeable deployed to: 0x7172d0BF2375307bcCb202ab32a4C52496654b1A
// npx hardhat verify --contract contracts/BatchTokenSenderUpgradeable.sol:BatchTokenSenderUpgradeable --network testnet 0xF78DfD1D95Bd95ED6115e32f9e2A5C708289Dbd3

// 2021-12-07
// npx hardhat --network mainnet run scripts/BatchTokenSenderUpgradeable.ts
// BatchTokenSenderUpgradeable deployed to: 0x2D973C629966D354B65040B0f15c220e62dEA8DD

// 2022-01-30 
// npx hardhat --network testnetIpx run scripts/BatchTokenSenderUpgradeable.ts
// BatchTokenSenderUpgradeable deployed to: 0x570dAc16365d6450c27e21Fef53d122235c6b63c