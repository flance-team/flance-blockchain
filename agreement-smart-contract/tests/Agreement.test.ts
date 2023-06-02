import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";
import { Agreement } from "../typechain-types";

describe("Agreement", () => {
  let agreementContract: Agreement;

  beforeEach(async function () {
    const agreementFactory = await hre.ethers.getContractFactory("Agreement");
    agreementContract = await agreementFactory.deploy();
    await agreementContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided contract address", async function () {
      const deployTxReceipt = await agreementContract.deployTransaction.wait();
      expect(agreementContract.address).to.eq(deployTxReceipt.contractAddress);
    });
  });

  describe("when the contract is create job", function () {
    it("has the provided block number", async function () {
      const createJobTxReceipt = await agreementContract.addJob(
        "test job",
        "test company",
        10,
        10000
      );
      expect(createJobTxReceipt).to.have.property("blockNumber");
    });

    it("has the provided job id", async function () {
      const job = await agreementContract.Job_by_No(1);
      expect(job).to.have.property("jobId");
    });
  });

  describe("when the contract is create and sign agreement", function () {
    it("has the provided hash", async function () {
      const createJobTxReceipt = await agreementContract.addJob(
        "test job",
        "test company",
        10,
        10000
      );
      expect(createJobTxReceipt).to.have.property("blockNumber");

      const wallet = new ethers.Wallet(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      );
      const signer = wallet.connect(ethers.provider);
      const signAgreementTxReceipt = await agreementContract
        .connect(signer)
        .createAndSignAgreementFor7Days(1, "test user");
      expect(signAgreementTxReceipt).to.have.property("hash");
    });

    it("has the provided hash", async function () {
      const createJobTxReceipt = await agreementContract.addJob(
        "test job",
        "test company",
        10,
        10000
      );
      expect(createJobTxReceipt).to.have.property("blockNumber");

      const wallet = new ethers.Wallet(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      );
      const signer = wallet.connect(ethers.provider);
      const signAgreementTxReceipt = await agreementContract
        .connect(signer)
        .createAndSignAgreementFor30Days(1, "test user");
      expect(signAgreementTxReceipt).to.have.property("hash");
    });

    it("has the provided hash", async function () {
      const createJobTxReceipt = await agreementContract.addJob(
        "test job",
        "test company",
        10,
        10000
      );
      expect(createJobTxReceipt).to.have.property("blockNumber");

      const wallet = new ethers.Wallet(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      );
      const signer = wallet.connect(ethers.provider);
      const signAgreementTxReceipt = await agreementContract
        .connect(signer)
        .createAndSignAgreementFor180Days(1, "test user");
      expect(signAgreementTxReceipt).to.have.property("hash");
    });

    it("has the provided agreement id", async function () {
      const agreement = await agreementContract.JobAgreement_by_No(1);
      expect(agreement).to.have.property("agreementId");
    });

    it("has the provided user id", async function () {
      const user = await agreementContract.User_by_No(1);
      expect(user).to.have.property("userId");
    });
  });
});
