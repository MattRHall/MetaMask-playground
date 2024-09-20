# MetaMask and HardHat Integration Project

## Introduction
This project demonstrates the functionality of MetaMask and interaction with a blockchain running locally in HardHat.

## Tech Stack
- **Blockchain**: Smart contracts are written in Solidity and deployed/tested with HardHat and Ethers.js. The blockchain operates locally with HardHat, and interaction is primarily through MetaMask, although some operations can also be handled with Ethers.js.
- **Front-end**: The front-end is developed using React, along with CSS and JSX.

## Setup
The project is organized into two main directories:

1. **`blockchain`**: 
   - This directory is used for developing, testing, and deploying blockchain contracts. It is also where your ABIs are generated.
   - Run the following command to initialize a new Node.js project:
     ```bash
     npm init
     ```
   - Install the necessary packages:
     ```bash
     npm install --save-dev hardhat typechain ethers @typechain/ethers-v6
     ```
   - Create a new HardHat project:
     ```bash
     npx hardhat init
     ```

2. **`frontend`**: 
   - This directory is used for front-end development and testing.
   - Run the following command to initialize a new Node.js project:
     ```bash
     npm init
     ```
   - Install the necessary packages:
     ```bash
     npm install react react-dom react-scripts ethers
     ```
   - Note: We do not need to install anything from MetaMask, as it is injected into the browser through the global variable `window.ethereum`.

## Running the Project
- **`blockchain`**: 
  - Start the local blockchain:
    ```bash
    npx hardhat node
    ```
  - Deploy the contract:
    ```bash
    npx hardhat run --network localhost scripts/deploy.js
    ```
  - When running the blockchain, you will see 20 private keys each with Ether for testing. Use the first account to add it to MetaMask.

- **`frontend`**: 
  - Start the React app:
    ```bash
    npm start
    ```
  - This will execute `npm react-scripts start`, which starts the server at `localhost:3000`.

## Usage
MetaMask is automatically injected into the browser and should be available in `window.ethereum`. It needs to be connected to the correct chain (run locally). You can set this up manually in MetaMask or click the **Connect LocalHost** button, which uses the MetaMask `wallet_addEthereumChain` method to add the chain (RPC URL: `http://localhost:8545`).

