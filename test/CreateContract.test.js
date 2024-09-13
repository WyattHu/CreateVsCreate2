const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../hardhat-config-helper");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("CreateContract", function () {
      let createContract;
      let deployer;
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        createContract = await ethers.getContract("CreateContract", deployer);
      });

      describe("create", function () {
        it("create contract address", async () => {
          const value = 0;
          const tx = await createContract.createSimpleContract(value);
          const receipt = await tx.wait();
          const createContractAddress =
            await createContract.createContractAddress();
          console.log(createContractAddress);
          assert.notEqual(createContractAddress, ethers.ZeroAddress);
        });
      });

      describe("create2", function () {
        it("create2 contract address", async () => {
          const value = 0;
          const tx = await createContract.create2SimpleContract(value);
          const receipt = await tx.wait();
          const create2ContractAddress =
            await createContract.create2ContractAddress();
          console.log(create2ContractAddress);

          assert.notEqual(create2ContractAddress, ethers.ZeroAddress);
        });

        it("Test Create2 contract address if correct", async () => {
          const value = 0;
          const tx = await createContract.create2SimpleContract(value);
          const receipt = await tx.wait();
          const create2ContractAddress =
            await createContract.create2ContractAddress();
          console.log(create2ContractAddress);
          const response = await createContract.computeCreate2Address(value);
          //   console.log(response1);
          //   console.log(response2);

          assert.equal(create2ContractAddress, response);
        });
      });
    });
