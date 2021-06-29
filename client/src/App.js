import React, { Component } from "react";
import ItemManager from './contracts/ItemManager.json';
import Item from './contracts/Item.json';

import SCMToken from './contracts/SCMToken.json';
import TokenSale from './contracts/TokenSale.json';
import KycContact from './contracts/KycContract.json';

import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {

//  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  state = {
    cost: 0,
    web3: null,
//    accounts: null,
    itemName: 'exampleItem1',
    loaded: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      this.accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.getChainId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      this.itemManager = new web3.eth.Contract(
          ItemManager.abi,
          ItemManager.networks[networkId] && ItemManager.networks[networkId].address,
      );

      this.item = new web3.eth.Contract(
          Item.abi,
          Item.networks[networkId] && Item.networks[networkId].address,
       )

      this.listenToPaymentEvent();


      this.scmToken = new web3.eth.Contract(
        SCMToken.abi,
        SCMToken.networks[this.networkId] && SCMToken.networks[this.networkId].address
      );

      this.tokenSale = new web3.eth.Contract(
        TokenSale.abi,
        TokenSale.networks[this.networkId] && TokenSale.networks[this.networkId].address
      )

      this.kycContact = new web3.eth.Contract(
        KycContact.abi,
        KycContact.networks[this.networkId] && KycContact.networks[this.networkId].address
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
//      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ loaded: true });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.itemManager);
    let result = await this.itemManager.methods.createItem(itemName, cost).send({ from: this.accounts[0] });
    console.log(result);
    alert("Send "+cost+" Wei to "+result.events.addSupplyChainStep.returnValues._address);
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  listenToPaymentEvent = () => {
    let self = this;
    console.log(this.itemManager.events);
    this.itemManager.events.addSupplyChainStep().on("data", async function(e) {
      if(e.returnValues._step === 1) {
        let item = await self.itemManager.methods.items(e.returnValues._itemIndex).call();
        console.log(item);
        alert("Item " + item._identifier + " was paid, deliver it now!");
      };
      console.log(e);
    });


  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.itemManager.methods.items(0));
    return (
      <div className="App">
        <h1>Simply Payment/Supply Chain Example!</h1>
        <h2>Items</h2>

        <h2>Add Element</h2>
        Item Name: <input type="text" name="itemName" value={this.state.itemName} onChange={this.handleInputChange} />
        Cost: <input type="text" name="cost" value={this.state.cost} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleSubmit}>Create new Item</button>

        <h2>Supply Chain contract token reserve</h2>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
