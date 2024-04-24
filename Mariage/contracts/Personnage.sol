// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Personnage {
    struct Personne {
        string nom;
        address addr;
        bool estMarie;
    }

    Personne[] public personnes;

    function creerPersonne(string memory _nom) public {
        personnes.push(Personne(_nom, msg.sender, false));
    }

    function getPersonne(uint _id) public view returns (Personne memory) {
        require(_id < personnes.length, "Cette personne n'existe pas");
        return personnes[_id];
    }

    function marierPersonne(uint _id) public {
        require(_id < personnes.length, "Cette personne n'existe pas");
        personnes[_id].estMarie = true;
    }
}