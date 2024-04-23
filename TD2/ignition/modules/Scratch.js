const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ScratchModule = buildModule("ScratchModule", (m) => {

  const scratch = m.contract("Scratch");

  return { scratch };
});

module.exports = ScratchModule;