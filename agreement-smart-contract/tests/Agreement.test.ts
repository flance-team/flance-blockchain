import { expect } from "chai";
import { ethers } from "hardhat";
import { Agreement } from "../typechain-types";

describe("Agreement", () => {
  let agreementContract: Agreement;

  beforeEach(async function () {
    const agreementFactory = await ethers.getContractFactory("Agreement");
    agreementContract = await agreementFactory.deploy();
    await agreementContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided contract address", async function () {
      const deployTxReceipt = await agreementContract.deployTransaction.wait();
      expect(agreementContract.address).to.eq(deployTxReceipt.contractAddress);
    });
  });
});
