// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import './Item.sol';
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract ItemManager is Ownable {
    enum SupplyChainSteps { Created, Paid, Delivered }
    
    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        string _identifier;
    }
    
    mapping(uint => S_Item) public items;
    uint index;
    
    event addSupplyChainStep(uint _itemIndex, uint _step, address _address);
    
    function createItem(string memory _identifier, uint _priceInWei) public onlyOwner {
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;

        // emit events before changing state vars
        emit addSupplyChainStep(index, uint(items[index]._step), address(item));
        index++;
    }
    
    function payItem(uint _index) public payable {
        Item item = items[_index]._item;
        require(address(item) == msg.sender, "Only items self-updates allowed");
        require(item.priceInWei() <= msg.value, "Not fully paid");
        // TODO: customer can currently overpay. Add store credit or refund balance transaction.
        
        require(items[_index]._step == SupplyChainSteps.Created, "Item is already Paid or Delivered");
        items[_index]._step = SupplyChainSteps.Paid;
        emit addSupplyChainStep(_index, uint(items[_index]._step),address(item));
    }
    
    function deliverItem(uint _index) public onlyOwner {
        Item item = items[_index]._item;
        require(items[_index]._step == SupplyChainSteps.Paid, "Item is Not Paid or is already Delivered");
        items[_index]._step = SupplyChainSteps.Delivered;
        emit addSupplyChainStep(_index, uint(items[_index]._step), address(item));
    }
    
}

