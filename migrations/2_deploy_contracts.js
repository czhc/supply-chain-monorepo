var ItemManager = artifacts.require("ItemManager");
var [name, token] = ['SCT Token', 'SCT'];
var SCToken = artifacts.require('SCMToken');

module.exports = async function(deployer) {
  await deployer.deploy(ItemManager);
  await deployer.deploy(SCToken, name, token, 10**9); //initial supply of 10B
};

