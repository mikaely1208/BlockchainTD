
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mariage", function () {
  it("Should create a new marriage", async function () {
    const Personnage = await ethers.getContractFactory("Personnage");
    const personnage = await Personnage.deploy();
    await personnage.deployed();

    const Mariage = await ethers.getContractFactory("Mariage");
    const mariage = await Mariage.deploy(personnage.address);
    await mariage.deployed();

    await personnage.creerPersonne("Alice");
    await personnage.creerPersonne("Bob");

    await mariage.creerMariage(0, 1, { gasLimit: 1000000 });

    expect((await mariage.couples(0)).partenaire1.nom).to.equal("Alice");
    expect((await mariage.couples(0)).partenaire2.nom).to.equal("Bob");
  });
});