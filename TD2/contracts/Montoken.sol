// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MonToken is ERC20 {
    uint256 constant initialSupply = 1000000 * (10 ** 18);
    constructor() ERC20("MonToken", "MOTK") {
        _mint(msg.sender, initialSupply);
    }
}
