const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  deployer.deploy(MyToken, "100000000"); // 1 million tokens, 18 decimal places
};