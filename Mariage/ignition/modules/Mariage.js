// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Créer les personnages
  const Personnage = await ethers.getContractFactory("Personnage");
  const jean = await Personnage.deploy();
  await jean.deployed();
  await jean.creerPersonne("Jean");

  const domi = await Personnage.deploy();
  await domi.deployed();
  await domi.creerPersonne("Domi");

  // Créer le mariage
  const Mariage = await ethers.getContractFactory("Mariage");
  const mariage = await Mariage.deploy(jean.address, domi.address);
  await mariage.deployed();

  // Marier les deux personnages
  await mariage.creerMariage(0, 0);

  // Afficher les informations
  console.log(`Jean, ${jean.address}`);
  console.log(`Domi, ${domi.address}`);
  console.log(`Adresse du contrat de mariage: ${mariage.address}`);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(mariage, "Mariage");
  savePersonnageFiles(jean, "Jean");
  savePersonnageFiles(domi, "Domi");
}

function saveFrontendFiles(contract, contractName) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}-address.json`),
    JSON.stringify({ [contractName]: contract.address }, undefined, 2)
  );

  const ContractArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(ContractArtifact, null, 2)
  );
}

function savePersonnageFiles(personnage, personnageName) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, `${personnageName}-address.json`),
    JSON.stringify({ [personnageName]: personnage.address }, undefined, 2)
  );

  const ContractArtifact = artifacts.readArtifactSync("Personnage");

  fs.writeFileSync(
    path.join(contractsDir, `${personnageName}.json`),
    JSON.stringify(ContractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });