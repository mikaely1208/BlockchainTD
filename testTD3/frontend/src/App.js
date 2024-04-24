import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import TokenArtifact from './contracts/Marriage.json';
import contractAddress from './contracts/deployed_addresses.json';

const HARDHAT_NETWORK_ID = '31337';

function MarriageApp() {
  const [marriageContract, setMarriageContract] = useState(null);
  const [marriageInfo, setMarriageInfo] = useState(null);

  useEffect(() => {
    async function loadContract() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new Web3Provider(window.ethereum);
        const network = await provider.getNetwork();

        if (network.chainId === parseInt(HARDHAT_NETWORK_ID)) {
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress.Marriage, TokenArtifact.abi, signer);
          setMarriageContract(contract);
        }
      }
    }

    loadContract();
  }, []);

  async function checkMarriage() {
    if (marriageContract && marriageContract.signer) {
      const signer = marriageContract.signer;
      const address = await signer.getAddress();
      const result = await marriageContract.areMarried(address, '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c');
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