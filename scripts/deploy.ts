import { ethers } from "hardhat";

async function main() {
  const stamp = await ethers.deployContract("Stamp");
  await stamp.waitForDeployment();
  console.log(`stamp deployed to ${stamp.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
