//SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;


// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/GSN/Context.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import './Crowdsale.sol';
import './KycContract.sol';

contract TokenSale is Crowdsale {
  KycContract kyc;

  constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token,
    KycContract _kyc
  ) Crowdsale (rate, wallet, token) public {
    kyc = _kyc;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting...");
  }
}