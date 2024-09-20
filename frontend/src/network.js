// Function to prompt user to connec to local network
export async function _switchHardHatChain() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    console.log("MetaMask is not installed.");
    return;
  }
  // This is calls the "eth_chainID" method on MetaMask and returns current chainId
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const hardhatChainId = "0x7A69"; // 31337 in hexadecimal

  if (chainId !== hardhatChainId) {
    alert("Please switch MetaMask to the Hardhat Network (localhost:8545).");

    // Optionally, prompt the user to switch to the Hardhat Network
    const newChainId = await switchToLocalHardhatNetwork();
    return newChainId;
  } else {
    console.log("Already connected to the Hardhat Network.");
    return chainId;
  }
}

// Function to actually make the switch to local network
async function switchToLocalHardhatNetwork() {
  const hardhatChainId = "0x7A69"; // 31337 in hexadecimal

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: hardhatChainId,
          chainName: "Hardhat Network",
          rpcUrls: ["http://localhost:8545"],
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://localhost"], // Dummy URL or a valid one
        },
      ],
    });

    console.log("Network switch requested.");
    return hardhatChainId;
  } catch (error) {
    console.error("Error requesting network switch:", error);
  }
}
