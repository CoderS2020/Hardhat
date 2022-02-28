const { expect } = require('chai');
/*
describe('Token contract', function () {
  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const [owner] = await ethers.getSigners(); //getSigners-> account details are accessed
    console.log(owner);

    const Token = await ethers.getContractFactory('Token'); //instance contract

    const hardhatToken = await Token.deploy(); //deploy contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); //calling balanceOf function from Token.sol

    console.log('Owner address', owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //check if totalSupply is equal to ownerBalance
  });

  it('Should transfer tokens between accounts ', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners(); //getSigners-> account details are accessed

    const Token = await ethers.getContractFactory('Token'); //instance contract
    const hardhatToken = await Token.deploy(); //deploy contract

    //transfer 10 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 10);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

    //Transfer 5 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 5);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
  });
});
*/

//Optimized code
describe('Token Contract', function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1, addr2;

  //all the lines in the function will run before each test
  beforeEach(async function () {
    Token = await ethers.getContractFactory('Token');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      //owner account to addr1.address
      await hardhatToken.transfer(addr1.address, 5);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(5);

      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
    });

    it('Should fail if sender does not hae enough tokens', async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith('Not Enough Tokens');

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it('Should update balances after transactions', async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, 5);
      await hardhatToken.transfer(addr2.address, 10);

      const finalBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialOwnerBalance - 15);

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(5);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(10);
    });
  });
});
