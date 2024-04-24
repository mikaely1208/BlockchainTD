// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Personnage.sol";

contract Mariage {
    Personnage public personnageContract1;
    Personnage public personnageContract2;

    struct Couple {
        Personnage.Personne partenaire1;
        Personnage.Personne partenaire2;
    }

    Couple[] public couples;

    constructor(address _personnageContract1, address _personnageContract2) {
        personnageContract1 = Personnage(_personnageContract1);
        personnageContract2 = Personnage(_personnageContract2);
    }

    function creerMariage(uint _partenaire1Id, uint _partenaire2Id) public {
        Personnage.Personne memory partenaire1 = personnageContract1.getPersonne(_partenaire1Id);
        Personnage.Personne memory partenaire2 = personnageContract2.getPersonne(_partenaire2Id);
        require(!partenaire1.estMarie && !partenaire2.estMarie, unicode"Un ou les deux partenaires sont déjà mariés");
        couples.push(Couple(partenaire1, partenaire2));
        personnageContract1.marierPersonne(_partenaire1Id);
        personnageContract2.marierPersonne(_partenaire2Id);
    }
}