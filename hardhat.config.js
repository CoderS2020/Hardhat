/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
const ALCHEMY_API_KEY = '';
const ROPSTEN_PRIVATE_KEY = '';
module.exports = {
  solidity: '0.8.9',
  networks: {
    ropsten: {
      url: ``,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
