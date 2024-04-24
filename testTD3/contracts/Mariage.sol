// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Marriage {
    address public spouse1 = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address public spouse2 = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;

    constructor() {}

    function areMarried(address _person1, address _person2) public view returns(bool) {
        return (_person1 == spouse1 && _person2 == spouse2) || (_person1 == spouse2 && _person2 == spouse1);
    }
}