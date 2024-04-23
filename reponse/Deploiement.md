Deploiement sur Sepolia:

Prerequis :

- Votre cle prive sepolia recuperable sur Metamask
- Un compte Infura et une API key

Avec hardhat creer des `vars` avec la commande `npx hardhat vars set <key>`. Ces variables seront réutilisées dans le script de déploiement.

Par exemple :

```bash
npx hardhat vars set sepoliaPrivateKey <sepoliaPrivateKey>
npx hardhat vars set infuraApiKey <infuraApiKey>
```

Vous allez maintenant modifier votre configuration hardhat pour ajouter le reseau sepolia. Pour cela, ajouter le code suivant dans votre fichier `hardhat.config.js` :

```javascript
require("@nomicfoundation/hardhat-toolbox");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and add it to the configuration variables
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
```

Ensuite, le deploiement se fait grace a l'utilitaire ignition de hardhat. Pour chaque deploiement vous allez creer un fichier Token.js dans `ignition/modules` qui contiendra le code de deploiement. Par exemple :

```javascript
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {
  const Token = m.contract("Token");

  return { Token };
});

module.exports = TokenModule;

// Pour indiquer a Hardhat de se connecter
// a un reseau specifique, il faut utiliser la commande
```

Pour lancer le deploiement :

```bash
npx hardhat ignition deploy ./ignition/modules/Token.js --network sepolia
```

Si tout fonctionne comme prevu, vous devriez obtenir un message de confirmation de deploiement.
Avec l'adresse de votre contrat (consultable sur sepolia.etherscan.io)
