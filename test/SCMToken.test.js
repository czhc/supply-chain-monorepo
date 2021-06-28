const SCMToken = artifacts.require('SCMToken');

const chai = require('./chaisetup.js');
const BN = web3.utils.BN;
const expect = chai.expect;

contract( "SCM Token", function(accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  beforeEach(async()=> {
    this.scmToken = await SCMToken.new("SCM Token" , "SCT", 1000);
  })

  it(" all tokens should be in deployer's account", async() => {
    let instance = this.scmToken;
    let totalSupply = await instance.totalSupply();
    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("can transfer tokens from account 1 to account 2", async() => {
    const sendTokens = 1;
    let instance = this.scmToken;
    let totalSupply = await instance.totalSupply();

    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    return expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  })

  it("not possible to send more tokens than balance", async()=>{
    let instance = this.scmToken;
    let balanceOfAccount = await instance.balanceOf(initialHolder);
    return expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

    return  expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  })

});

