const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {

  const monToken = m.contract("MonToken");

  return { monToken };
});

module.exports = TokenModule;