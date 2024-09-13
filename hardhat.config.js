//require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-network-helpers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    /*  sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          //   accounts: {
          //     mnemonic: MNEMONIC,
          //   },
          saveDeployments: true,
          chainId: 11155111,
      }, */
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      //1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
    ],
  },
};
