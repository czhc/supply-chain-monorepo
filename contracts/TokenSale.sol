//SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;


// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/GSN/Context.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import './Crowdsale.sol';

contract TokenSale is Crowdsale {
//  KycContract kyc;

  constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token
  ) Crowdsale (rate, wallet, token) public {

  }
}