const { id } = require("ethers");
const { ethers } = require("hardhat");

const networkConfig = {
  default: {
    name: "hardhat",
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
