require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();

const { API_URL, API_URL_MAINNET, PRIVATE_KEY, ETHERSCAN_API, PRIVATE_KEY_MAINNET } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
    ,
    // mainnet: {
    //   url: API_URL_MAINNET,
    //   accounts: [PRIVATE_KEY_MAINNET]
    // }
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  }
};