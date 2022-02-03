/* eslint-disable no-unused-vars */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
function testFun() {
  console.log("test");
}
class Test {
  async account(...param: any) {
    console.log("param: %o", param);
  }
}
// npx hardhat --network testnetIpx run scripts/test.ts
async function main() {
  const action = "account";
  const params = [4];
  const test = new Test();
  if (test[action] && typeof test[action] === "function") {
    test[action](...params);
  }
  // TODO: How to call testFun with string ?
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
