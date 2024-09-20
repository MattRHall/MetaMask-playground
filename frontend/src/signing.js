export async function _personalSign(inputString) {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const sig = await window.ethereum.request({
      method: "personal_sign",
      params: [inputString, accounts[0]],
    });
    console.log("Signed message", sig);
    return sig;
  } catch (error) {
    console.log("Error on personal sign:", error);
  }
}
