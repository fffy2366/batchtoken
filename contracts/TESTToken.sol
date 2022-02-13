// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TESTToken is ERC20, Ownable {
    constructor() ERC20("TestToken", "TEST") {
        _mint(msg.sender, 1000000000 * 1e18);
    }

    function mint(address accout, uint256 amount) external onlyOwner {
        _mint(accout, amount);
    }
}
