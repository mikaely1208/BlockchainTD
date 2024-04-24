// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Personnage.sol";

contract Mariage {
    Personnage public personnageContract;
    struct Couple {
        Personnage.Personne partenaire1;
        Personnage.Personne partenaire2;
    }

    Couple[] public couples;

    constructor(address _personnageContract) {
        personnageContract = Personnage(_personnageContract);
    }

    function creerMariage(uint _partenaire1Id, uint _partenaire2Id) public {
        Personnage.Personne memory partenaire1 = personnageContract.getPersonne(_partenaire1Id);
        Personnage.Personne memory partenaire2 = personnageContract.getPersonne(_partenaire2Id);
        require(!partenaire1.estMarie && !partenaire2.estMarie, unicode"Un ou les deux partenaires sont déjà mariés");
        couples.push(Couple(partenaire1, partenaire2));
        personnageContract.marierPersonne(_partenaire1Id);
        personnageContract.marierPersonne(_partenaire2Id);
    }
}