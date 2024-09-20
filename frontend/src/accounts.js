import { ethers } from "ethers";

export async function _getPermissions() {
  try {
    const permissions = await window.ethereum.request({
      method: "wallet_getPermissions",
      params: [],
    });
    console.log("Permissions:", permissions);
    return permissions;
  } catch (error) {
    console.error("Error requesting permissions:", error);
  }
}

// we could use different permissions, not just eth_acconts
export async function requestPermissions() {
  try {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  } catch (error) {}
}

// This calls wallet_requestPermissions with eth_accounts only
export async function _requestAccounts() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("User accounts:", accounts);
    return accounts;
  } catch (error) {
    console.error("Error requesting accounts:", error);
  }
}

// Return list of addresses for the accounts owned by the user
// Need to have permission for this function to work
export async function _getAccounts() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    console.log("Accounts:", accounts);
    return accounts;
  } catch (error) {
    console.error("Error getting accounts:", error);
  }
}

export async function _getBalance() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Use this opportunity to request access to write operations with private key
    const signer = await provider.getSigner();

    // update state with wallet address
    const activeAddress = await signer.getAddress();

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [activeAddress],
    });
    console.log("Balance:", balance);
    return balance;
  } catch (error) {
    console.error("Error getting balance:", error);
  }
}
