import { ethers } from "hardhat";
import { Agreement__factory } from "../typechain-types";

const deployment = async () => {
  const provider = ethers.provider;
  const pkey = process.env.PRIVATE_KEY;

  if (!pkey || pkey.length <= 0)
    throw new Error(
      "Missing environment : Private key, please check your .env file"
    );

  const wallet = new ethers.Wallet(pkey);
  console.log(`Connected to the wallet address ${wallet.address}`);

  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(`Wallet balance: ${balance} Wei`);

  console.log("Deploying Agreement contract");

  const agreementContractFactory = new Agreement__factory(signer);
  console.log("Deploying contract ...");
  const agreementContract = await agreementContractFactory.deploy();
  const deployTxReceipt = await agreementContract.deployTransaction.wait();
  console.log(
    `The contract was deployed at the address ${agreementContract.address}`
  );
  console.log({ deployTxReceipt });
};

deployment().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
