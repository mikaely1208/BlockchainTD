require("@nomicfoundation/hardhat-toolbox");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/757e602fe21b4ed48ab1f2374e80697d`,
      accounts: ["0x10977955fe22e1eca26aa681b428842c576ec83462e690fb19e882194c2cf46c"],
      chainId: 31337,
    },
  },
};