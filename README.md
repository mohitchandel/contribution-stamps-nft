# Contribution Stamp App

The Contribution Stamp app is a web application that allows users to mint stamps based on the programming languages used in their GitHub repositories. It is built with the following technologies:

## Tech Stack

- Next.js: A React framework for building web applications.
- Solidity: A programming language used for writing smart contracts on the Ethereum blockchain.
- Hardhat: A development environment and testing network for Ethereum smart contracts.
- Polygon Mumbai Testnet: A test network provided by the Polygon (formerly Matic) blockchain for testing and development purposes.

## Features

The Contribution Stamp app provides the following features:

- User Authentication: Users can sign up and log in to the app using their GitHub credentials.
- GitHub Repository Retrieval: Users can enter their GitHub username to retrieve their repositories.
- Language Analysis: The app analyzes the languages used in the retrieved repositories.
- Stamp Minting: If a user has repositories that use JavaScript, Rust, or Solidity, they are eligible to mint a stamp.
- Smart Contract Integration: The app interacts with a Solidity smart contract deployed on the Polygon Mumbai Testnet to handle stamp minting and storage.
- Stamp Collection: Users can view and manage their minted stamps in their collection.
- User Profile: The app includes a user profile page to display user information and stamp statistics.

## Testing

To run tests for the Contribution Stamp app, follow these steps:

1. Ensure that the Hardhat development environment is set up correctly.
2. Write your tests in the `test` directory.
3. Run `npx hardhat test` to execute the tests.
4. Review the test results to ensure that all the app's functionalities are working as expected.

## Smart Contract

The Stamp smart contract (`Stamp.sol`) is a Solidity contract that extends several OpenZeppelin contracts to implement the functionality for minting stamps based on GitHub repository languages.

The contract includes the following features:

- Minting stamps: Users can mint stamps by providing a URI, a claim request object, and a language. The contract verifies the user's eligibility based on the claim request and mints a unique stamp token if the user meets the requirements.
- Verification of contribution: The contract includes a `verifyContribution` function to verify a user's eligibility based on their contribution. It checks if the user has contributed and has a minimum number of repositories.
- Token management: The contract extends ERC721 contracts to handle token management, including safe minting, burning, and transferring of stamps.
- Language enumeration: The contract defines an enumeration for the supported programming languages, including JavaScript, Solidity, and Rust.
- Data storage: The contract uses mappings to store data, such as minted stamps per user and the languages they have minted stamps for.

Contract address : [0x086074639341217ca2fcfba62c727d9857925e03](https://mumbai.polygonscan.com/address/0x086074639341217ca2fcfba62c727d9857925e03)
