import React, { useState } from "react";
import { ethers } from "ethers";
import { _switchHardHatChain } from "./network";
import {
  _getPermissions,
  requestPermissions,
  _requestAccounts,
  _getAccounts,
  _getBalance,
} from "./accounts";
import { _personalSign } from "./signing";
import { _setValue, _getValue, _estimateGas } from "./transaction";
import { _blockNumber, _chainId } from "./chainInfo";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [activeChain, setActiveChain] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [getAccounts, setGetAccounts] = useState([]);
  const [inputString, setInputString] = useState("");
  const [personalSig, setPersonalSig] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputReceipt, setInputReceipt] = useState("");
  const [latestBlockNum, setLatestBlockNum] = useState("");
  const [activeChain2, setActiveChain2] = useState("");
  const [value, setVal] = useState("");
  const [inputEstGas, setInputEstGas] = useState("");
  const [estGas, setEstGas] = useState("");
  const [balance, setbalance] = useState("");

  const connectWallet = async () => {
    const address = await _connectWallet();
    setWalletAddress(address);
  };

  const switchHardHatChain = async () => {
    const chainId = await _switchHardHatChain();
    setActiveChain(chainId);
  };

  const getPermissions = async () => {
    const permissions = await _getPermissions();
    setPermissions(permissions);
  };

  const requestAccounts = async () => {
    const accounts = await _requestAccounts();
    setAccounts(accounts);
  };

  const getterAccounts = async () => {
    const accounts = await _getAccounts();
    setGetAccounts(accounts);
  };

  const handleInputStringChange = (event) => {
    setInputString(event.target.value);
  };

  const personalSign = async (inputString) => {
    const signature = await _personalSign(inputString);
    setPersonalSig(signature);
  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const setValue = async (inputValue) => {
    const receipt = await _setValue(inputValue);
    setInputReceipt(receipt);
  };

  const blockNumber = async () => {
    const blockNumber = await _blockNumber();
    setLatestBlockNum(parseInt(blockNumber));
  };

  const chainId = async () => {
    const activeChain = await _chainId();
    setActiveChain2(parseInt(activeChain));
  };

  const getValue = async () => {
    const value = await _getValue();
    setVal(value);
  };

  const handleInputEstGasChange = (event) => {
    setInputEstGas(event.target.value);
  };

  const estimateGas = async (inputEstGas) => {
    const estimateGas = await _estimateGas(inputEstGas);
    setEstGas(parseInt(estimateGas, 16));
  };

  const getBalance = async () => {
    const balance = await _getBalance();
    setbalance(parseInt(balance, 16));
  };

  return (
    <div className="container">
      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={connectWallet}>
            Connect Wallet
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            <p>
              This connects your wallet to the dApp using
              ethers.provider.getSigner(). The signer acts as an interface to
              MetaMask, allowing you to sign and send transactions. MetaMask
              handles the actual signing process, always prompting for user
              approval. It operates on the active account you've selected in
              MetaMask.
            </p>
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Wallet Address: {walletAddress}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={switchHardHatChain}>
            Connect LocalHost
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            <p>
              This switches the Ethereum Chain to the Hardhat local chain (id:
              "0x7A69", rpcURL: "http://localhost:8545") using the MetaMask API
              "wallet_addEthereumChain". It is good practice to add an alert to
              flag this change to the user.
            </p>
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Active ChainId: {activeChain}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={getPermissions}>
            Get Permissions
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            <p>
              This retrieves the permissions for the current active account
              (different accounts might have different permissions), using the
              MetaMask API "wallet_getPermissions".
            </p>
          </div>

          <div className="box output-box">
            <h3>Output</h3>
            {permissions.length > 0 ? (
              <ul className="permissions-list">
                {permissions.map((permission, index) => (
                  <li key={index}>
                    <strong>{permission.parentCapability}</strong>
                    <ul>
                      {permission.caveats.map((caveat, idx) => (
                        <li key={idx}>
                          <strong>{caveat.type}</strong>:{" "}
                          {JSON.stringify(caveat.value)}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="output-info">No permissions found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={requestPermissions}>
            Request Permissions
          </button>

          <div className="box description-box">
            <h3>Description</h3>
            To call a restricted MetaMask method, your dApp must request
            permissions from the user. This will create a confirmation asking
            the user to connect an account and allow the dApp to call the
            request method. This uses the "eth_requestPermissions" method.
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={requestAccounts}>
            Request Accounts
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            This method retrieves the list of accounts that the user has granted
            access to. It doesn't trigger a MetaMask popup if the user has
            already granted permissions; otherwise, it does. If access is
            already granted, it returns the list of accounts. This uses the
            "eth_requestAccounts" method.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            {accounts.length > 0 ? (
              <ul className="accounts-list">
                {accounts.map((account, index) => (
                  <li key={index}>
                    <strong>Account {index + 1}</strong>: {account}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="output-info">No accounts found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={getterAccounts}>
            Get Accounts
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            This retrieves the list of accounts that the wallet has already
            granted access to, without prompting the user for permission. This
            method does not trigger a MetaMask popup; it simply returns the
            accounts that your application already has permission to access.
            This uses the "eth_Accounts" method.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            {getAccounts.length > 0 ? (
              <ul>
                {getAccounts.map((account, index) => (
                  <li key={index}>
                    <strong>Account {index + 1}</strong>: {account}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No accounts found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <div>
            <input
              type="text"
              value={inputString}
              onChange={handleInputStringChange}
              placeholder="Enter a string to sign"
            />
            <button
              className="button connect"
              onClick={() => personalSign(inputString)}
            >
              Personal Sign
            </button>
          </div>
          <div className="box description-box">
            <h3>Description</h3>
            This is a method that allows users to sign arbitrary messages with
            their wallet's private key. This is useful for proving ownership of
            an account or authorizing actions without sending a transaction.
            This uses the "eth_personalSign" method.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Signed Message: {personalSig}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputValueChange}
              placeholder="Enter a value to set"
            />
            <button
              className="button connect"
              onClick={() => setValue(inputValue)}
            >
              Input Value
            </button>
          </div>
          <div className="box description-box">
            <h3>Description</h3>
            Set a value in the connected contract. We create a transaction
            object, which includes encodedData (function / params) as well as
            the contractAddress and the from address. We then use
            "eth_sendTransaction" method to send the transaction (MetaMask will
            open a popup, sign the message, and then send).
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Tx Hash: {inputReceipt}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={blockNumber}>
            Block Number
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            Get the latest block number from the blockchain using the
            "eth_blockNumber" method with parameter set to "latest".
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">BlockNumber: {latestBlockNum}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={chainId}>
            Chain ID
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            Get the chain ID of the connected network using the "eth_chainID"
            method.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">ActiveChain: {activeChain2}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={getValue}>
            Get Value
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            Retrieve the stored value from the contract using "eth_call" method.
            This method doesn't require signing or a MetaMask popup, it is
            purely for accessing view only data.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Value: {value}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <div>
            <input
              type="text"
              value={inputEstGas}
              onChange={handleInputEstGasChange}
              placeholder="Enter a value to for gas estimation"
            />
            <button
              className="button connect"
              onClick={() => estimateGas(inputEstGas)}
            >
              Input Value
            </button>
          </div>
          <div className="box description-box">
            <h3>Description</h3>
            The "eth_estimateGas" function is used to estimate the amount of gas
            required to execute a transaction on the Ethereum network. It takes
            a transaction object as input and simulates the transaction without
            broadcasting it, returning an estimate of the gas needed for
            successful execution. This estimation helps users set appropriate
            gas limits for their transactions, ensuring they are neither too low
            (which could cause the transaction to fail) nor excessively high
            (which could lead to overpaying for gas).
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">EstimatedGas: {estGas}</p>
          </div>
        </div>
      </div>

      <div className="grouped-box">
        <div className="action-row">
          <button className="button connect" onClick={getBalance}>
            Get Balance
          </button>
          <div className="box description-box">
            <h3>Description</h3>
            This uses the "eth_getBalance" method to get the balance of the
            current active account. This will be the balance of the coin used to
            pay gas for the blockchain.
          </div>
          <div className="box output-box">
            <h3>Output</h3>
            <p className="output-info">Balance: {balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to connect
async function _connectWallet() {
  let signer = null;
  let provider;

  // if metamask not installed we use read-only provider. this allows
  // blockchain interaction without needing wallet or private key. Since
  // read-only you can't send transactions, deploy contraccts, or sign. You
  // can read contract state, get gas price, or query block for data.
  if (window.ethereum == null) {
    console.log("MetaMask not installed, using read only provider");
    provider = ethers.getDefaultProvider();
  } else {
    // window.ethereum is a global object injected into the browser by ethereum
    // wallets. This is most likely MetaMask but it could be something else.
    provider = new ethers.BrowserProvider(window.ethereum);

    // Use this opportunity to request access to write operations with private key
    signer = await provider.getSigner();

    // update state with wallet address
    const address = await signer.getAddress();

    return address;
  }
}
