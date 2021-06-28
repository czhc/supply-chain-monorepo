var ItemManager = artifacts.require("./ItemManager.sol");
var [name, token] = ['SCT Token', 'SCT'];
var SCToken = artifacts.require('./SCMToken.sol');

module.exports = async function(deployer) {
  console.log('name', name);
  await deployer.deploy(ItemManager);
  await deployer.deploy(SCToken, name, token);
};
