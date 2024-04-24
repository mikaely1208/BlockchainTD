const { expect } = require("chai");

describe("Marriage contract", function() {
  it("Should deploy the contract and store the addresses", async function() {
    const Marriage = await ethers.getContractFactory("Marriage");
    const marriage = await Marriage.deploy("0xAddress1", "0xAddress2");
    
    expect(await marriage.spouse1()).to.equal("0xAddress1");
    expect(await marriage.spouse2()).to.equal("0xAddress2");
  });
});