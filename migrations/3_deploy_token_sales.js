var SCMToken = artifacts.require('SCMToken');
var TokenSale = artifacts.require('TokenSale');
var KycContract = artifacts.require('KycContract');

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(KycContract);
  await deployer.deploy(TokenSale, 1, addr[0], SCMToken.address, KycContract.address);

  let tokenInstance = await SCMToken.deployed();
  let tokenSaleInstance = await TokenSale.deployed();
  await tokenInstance.transfer(tokenSaleInstance.address, 10**9)
};
