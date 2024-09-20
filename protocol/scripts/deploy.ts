const { ethers } = require("hardhat");
import { DataStore, DataStore__factory } from "../typechain";

async function main() {
  const DataStore = await ethers.getContractFactory("DataStore");
  const dataStore = await DataStore.deploy();
  await dataStore.waitForDeployment();

  console.log(
    "dataStore contract deployed to " + (await dataStore.getAddress())
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
