const { task } = require("hardhat/config")

require ("@nomiclabs/hardhat-etherscan")
require ("@nomiclabs/hardhat-waffle")
require ("@typechain/hardhat")
require ("hardhat-gas-reporter")
require ("solidity-coverage")
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy")
require("dotenv").config();

task("accounts", "prints the list of accounts", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }
});


//const {REACT_APP_GOERLI_RPC_URL, REACT_APP_PRIVATE_KEY} = process.env;
//import { HardhatUserConfig, task } from "hardhat/config";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_SEPOLIA_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
    },
  },
  etherscan:{
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  },
};
