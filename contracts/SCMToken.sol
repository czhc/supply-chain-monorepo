// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.6 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SCMToken is ERC20 {
    constructor (string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }
}
