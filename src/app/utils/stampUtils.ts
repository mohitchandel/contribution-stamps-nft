export const customMessages = {
  EMPTY_USERNAME: "Please add a GitHub username",
  MINT_SUCCESS: "Stamp Minted Successfully",
  MINT_ERROR: "Facing Error While Minting",
  UNABLE_TO_MINT: "You don't have any contributor, You can't mint.",
  WALLET_NOT_CONNECT: "Please connect your wallet",
  WRONG_CHAIN: "Please switch to Polygon Mumbai testnet",
};

export type mintDataType = {
  contributed: boolean;
  repos: bigint;
  username: string;
};

export const CONTRACT_ADDRESS = "0x086074639341217ca2fcfba62c727d9857925e03";

export const languagesIndexes = {
  JavaScript: 0,
  Solidity: 1,
  Rust: 2,
};
