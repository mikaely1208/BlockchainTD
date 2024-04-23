const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  compilers: {
    solc: {
      version: "^0.8.0",   
    },
  },
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider("10977955fe22e1eca26aa681b428842c576ec83462e690fb19e882194c2cf46c", `https://sepolia.infura.io/v3/757e602fe21b4ed48ab1f2374e80697d`),
      network_id: 11155111, // sepolia id
      gas: 5500000,       
      confirmations: 10,   
      timeoutBlocks: 200,  
      skipDryRun: true   
    },
  },
};