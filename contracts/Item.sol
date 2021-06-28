// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;
import './ItemManager.sol';

contract Item {
    uint public priceInWei;
    uint public paidWei;
    uint public index;
    
    ItemManager parentContract;
    
    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }
    
    receive() external payable {
        require(msg.value == priceInWei, "Does not match full price of item.");
        require(paidWei == 0, "Item is already paid");
        paidWei += msg.value;
        parentContract.payItem{value: msg.value}(index);
    }
    
    fallback() external {}
}
