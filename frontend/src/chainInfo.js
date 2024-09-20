// not available on local hardhat node
export async function blobBaseFee() {
  try {
    const blobBaseFee = await window.ethereum.request({
      method: "eth_blobBaseFee",
      params: [],
    });
    console.log(blobBaseFee);
  } catch (error) {
    console.log("Error getting blobBaseFee:", error);
  }
}

export async function _blockNumber() {
  try {
    const blockNumber = await window.ethereum.request({
      method: "eth_blockNumber",
      params: [],
    });
    console.log(blockNumber);
    return blockNumber;
  } catch (error) {
    console.log("Error getting block:", error);
  }
}

export async function _chainId() {
  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
      params: [],
    });
    console.log("chainId:", chainId);
    return chainId;
  } catch (error) {
    console.log("Error getting chain ID");
  }
}
