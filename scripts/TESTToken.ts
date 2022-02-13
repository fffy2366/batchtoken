import { ethers } from "hardhat";

// npx hardhat --network testnet run scripts/TESTToken.ts
async function main() {
  // We get the contract to deploy
  const TESTToken = await ethers.getContractFactory("TESTToken");
  const test = await TESTToken.deploy();

  await test.deployed();

  console.log("TESTToken deployed to: %s", test.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// TESTToken deployed to: 0x7F3e94355c0b829CE175a6F1ec3f1B7468659CCA
// npx hardhat verify --contract contracts/TESTToken.sol:TESTToken --network testnet 0x7F3e94355c0b829CE175a6F1ec3f1B7468659CCA
