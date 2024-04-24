const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MariageModule", (m) => {
  const mariage = m.contract("Marriage", []);

  return { mariage };
});