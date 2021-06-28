const SCMToken = artifacts.require('SCMToken');

var chai = require('chai');
const BN = web3.utils.BN;

const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("SCM Token", function(accounts) => {
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

    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  })

  it("not possible to send more tokens than balance", async()=>{
    let instance = this.scmToken;
    let balanceOfAccount = await instance.balanceOf(initialHolder);
    await expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  })

});

