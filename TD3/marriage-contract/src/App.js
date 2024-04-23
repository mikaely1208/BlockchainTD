import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

// Fonction d'aide pour convertir les BigInt en chaînes
function bigIntToString(bigIntValue) {
  return bigIntValue.toString();
}

function MarriageApp() {
  const [marriageContract, setMarriageContract] = useState(null);
  const [marriageInfo, setMarriageInfo] = useState(null);

  useEffect(() => {
    async function loadContract() {
      if (typeof window.ethereum !== 'undefined') {
        // Demande à l'utilisateur de connecter son portefeuille
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0x1ca9E5E77c1baA4Cb96462893b1327FC2600524a';
        const contractABI = [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_person1",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_person2",
                "type": "address"
              }
            ],
            "name": "areMarried",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "spouse1",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "spouse2",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setMarriageContract(contract);
        console.log(contract)
      }
    }

    loadContract();
  }, []);

async function checkMarriage() {
  if (marriageContract && marriageContract.signer) {
    const signer = marriageContract.signer;
    const address = await signer.getAddress();
    console.log(address)
    const result = await marriageContract.areMarried(address, '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c');
    console.log(result)
    result.address1 = bigIntToString(result.address1);
    result.address2 = bigIntToString(result.address2);
    setMarriageInfo(result);
  }
}

  return (
    <div>
      <button onClick={checkMarriage}>Vérifier le mariage</button>
      {marriageInfo && (
        <div>
          <h2>Informations sur le mariage:</h2>
          <p>Adresse 1: {marriageInfo.address1}</p>
          <p>Adresse 2: {marriageInfo.address2}</p>
          <p>Est marié: {marriageInfo.isMarried ? 'Oui' : 'Non'}</p>
        </div>
      )}
    </div>
  );
}

export default MarriageApp;