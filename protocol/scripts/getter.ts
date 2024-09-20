import { ethers } from "hardhat";
import { DataStore } from "../typechain/DataStore";

const main = async () => {
  // Get accounts
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const DataStore = await ethers.getContractFactory("DataStore");
  const dataStore = DataStore.attach(contractAddress) as DataStore;

  const [signer] = await ethers.getSigners();

  console.log(signer.address);
  console.log(await dataStore.connect(signer).getValue());
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
