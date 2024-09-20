import DataStore from "./abis/DataStore.json"; // import contract json (includes abi)
import { contractAddress } from "./constants";

const { ethers } = require("ethers");

// Set value equal to 100 for that user.
export async function _setValue(inputValue) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const dataStore = new ethers.Contract(
      contractAddress,
      DataStore.abi,
      provider.getSigner()
    );

    // encode transaciton data
    const encodedData = dataStore.interface.encodeFunctionData("setValue", [
      inputValue,
    ]);

    const txHash = await sendTransaction(encodedData);
    return txHash;
  } catch (error) {
    console.log("Error in setting value:", error);
  }
}

// Send transaction to MetaMask to sign and send it (eth_transaction)
async function sendTransaction(encodedData) {
  try {
    // get the first requested account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const tx = {
      to: contractAddress,
      from: accounts[0],
      value: "0x0", // No Ether sent with this transaction
      gas: "0x100000", // Increase gas limit
      data: encodedData,
      gasPrice: await window.ethereum.request({
        method: "eth_gasPrice",
      }), // Get current gas price
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    console.log("Transaction hash:", txHash);
    return txHash;
  } catch (error) {
    console.log("Error sending transaction:", error);
  }
}

// async function to make a view only call from address (eth_call)
export async function _getValue() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const dataStore = new ethers.Contract(
      contractAddress,
      DataStore.abi,
      provider.getSigner()
    );

    // encode transaciton data
    const encodedData = dataStore.interface.encodeFunctionData("getValue", []);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const result = await window.ethereum.request({
      method: "eth_call",
      params: [
        {
          to: contractAddress,
          from: accounts[0],
          data: encodedData,
        },
        "latest", // block number
      ],
    });
    console.log("Value:", parseInt(result, 16));
    // make call
    return parseInt(result, 16);
  } catch (error) {
    console.log("Error getting value:", error);
  }
}

export async function _estimateGas(inputValue) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const dataStore = new ethers.Contract(
      contractAddress,
      DataStore.abi,
      provider.getSigner()
    );
    // encode transaciton data
    const encodedData = dataStore.interface.encodeFunctionData("setValue", [
      parseInt(inputValue, 10),
    ]);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const tx = {
      to: contractAddress,
      from: accounts[0],
      value: "0x0", // No Ether sent with this transaction
      gas: "0x100000", // Increase gas limit
      data: encodedData,
      gasPrice: await window.ethereum.request({
        method: "eth_gasPrice",
      }), // Get current gas price
    };

    const estimateGas = await window.ethereum.request({
      method: "eth_estimateGas",
      params: [tx],
    });

    return estimateGas;
  } catch (error) {
    console.log("Error in setting value:", error);
  }
}
