require("@nomicfoundation/hardhat-toolbox");

const alchemy_api_key = process.env.ALCHEMY_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemy_api_key}`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
};
