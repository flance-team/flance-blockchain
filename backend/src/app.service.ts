import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethers } from 'ethers';
import { CreateJobDto } from './dto/create-job.dto';
import derivedAddress from './utils/derivedAddress';
import generateMnemonic from './utils/generateMnemonic';
import * as agreementContractJSON from './assets/Agreement.json';
import { CreateAndSignAgreementDto } from './dto/create-and-sign-agreement-dto';
import depositAVAX from './utils/depositAVAX';
import checkBalance from './utils/checkBalance';
import infuraConfig from './config/testing.config';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  agreementContract: ethers.Contract;
  ownerPrivateKey: string;

  constructor(
    @Inject(infuraConfig.KEY)
    private config: ConfigType<typeof infuraConfig>,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.config.INFURA_API_URL,
    );

    this.agreementContract = new ethers.Contract(
      this.config.TOKEN_CONTRACT_ADDRESS,
      agreementContractJSON.abi,
      this.provider,
    );

    this.ownerPrivateKey = this.config.OWNER_PRIVATE_KEY;
  }

  async createWallet(): Promise<object> {
    const mnemonic = await generateMnemonic();
    const walletAddress = derivedAddress(mnemonic);
    const depositHash = await depositAVAX(
      this.provider,
      '0.1',
      walletAddress.cAddresses[0],
      this.ownerPrivateKey,
    );

    return { mnemonic, walletAddress, depositHash };
  }

  async balance(walletAddress: string): Promise<any> {
    const balance = await checkBalance(this.provider, walletAddress);

    return { balance };
  }

  async createJob(
    createJobDto: CreateJobDto,
    privateKey: string,
  ): Promise<object> {
    const { jobTitle, companyName, workHourPerWeek, salaryPerHour } =
      createJobDto;
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);
    const createJob = await agreementContractAddress.addJob(
      jobTitle,
      companyName,
      workHourPerWeek,
      salaryPerHour,
    );
    const jobBlockchainId =
      +ethers.utils.formatUnits(
        await agreementContractAddress.no_of_jobs(),
        0,
      ) + 1;

    return {
      jobTitle,
      companyName,
      workHourPerWeek,
      salaryPerHour,
      hash: createJob.hash,
      jobBlockchainId,
    };
  }

  async readJobById(jobId: string, privateKey: string): Promise<object> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);
    const readJob = await agreementContractAddress.Job_by_No(+jobId);

    return {
      jobId,
      agreementId: ethers.utils.formatUnits(readJob.agreementId, 0),
      userId: ethers.utils.formatUnits(readJob.userId, 0),
      jobTitle: readJob.jobTitle,
      companyName: readJob.companyName,
      workHourPerWeek: ethers.utils.formatUnits(readJob.workHourPerWeek, 0),
      contractDuration: ethers.utils.formatUnits(readJob.contractDuration, 0),
      salaryPerHour: ethers.utils.formatUnits(readJob.salaryPerHour, 0),
      status: readJob.statusOpen,
      employerSigner: readJob.employer,
      userSigner: readJob.currentUser,
    };
  }

  async createAndSignAgreement(
    createAndSignAgreementDto: CreateAndSignAgreementDto,
    privateKey: string,
  ): Promise<object> {
    const { jobId, userName, contractDuration } = createAndSignAgreementDto;
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);

    let agreement: { hash: string };

    switch (contractDuration) {
      case 7:
        agreement =
          await agreementContractAddress.createAndSignAgreementFor7Days(
            jobId,
            userName,
          );
        break;
      case 30:
        agreement =
          await agreementContractAddress.createAndSignAgreementFor30Days(
            jobId,
            userName,
          );
        break;
      case 180:
        agreement =
          await agreementContractAddress.createAndSignAgreementFor180Days(
            jobId,
            userName,
          );
        break;
    }

    const agreementBlockchainId =
      +ethers.utils.formatUnits(
        await agreementContractAddress.no_of_jobAgreements(),
        0,
      ) + 1;

    const userBlockchainId = ethers.utils.formatUnits(
      await agreementContractAddress.no_of_users(),
      0,
    );

    return {
      jobId,
      userName,
      hash: agreement.hash,
      agreementBlockchainId,
      userBlockchainId,
    };
  }

  async readAgreementById(
    agreementId: string,
    privateKey: string,
  ): Promise<object> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);
    const readAgreement = await agreementContractAddress.JobAgreement_by_No(
      +agreementId,
    );

    return {
      agreementId,
      jobId: ethers.utils.formatUnits(readAgreement.jobId, 0),
      userId: ethers.utils.formatUnits(readAgreement.userId, 0),
      jobTitle: readAgreement.jobTitle,
      companyName: readAgreement.companyName,
      userName: readAgreement.userName,
      workHourPerWeek: ethers.utils.formatUnits(
        readAgreement.workHourPerWeek,
        0,
      ),
      contractDuration: ethers.utils.formatUnits(
        readAgreement.contractDuration,
        0,
      ),
      salaryPerHour: ethers.utils.formatUnits(readAgreement.salaryPerHour, 0),
      timestamp: ethers.utils.formatUnits(readAgreement.timestamp, 0),
      employerSigner: readAgreement.signedEmployer,
      userSigner: readAgreement.signedUser,
    };
  }

  async readUserById(userId: string, privateKey: string): Promise<object> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);
    const readUser = await agreementContractAddress.User_by_No(+userId);

    return {
      userId,
      jobId: ethers.utils.formatUnits(readUser.jobId, 0),
      agreementId: ethers.utils.formatUnits(readUser.agreementId, 0),
      userName: readUser.userName,
      timestamp: ethers.utils.formatUnits(readUser.timestamp, 0),
      employerSigner: readUser.currentEmployer,
      userSigner: readUser.user,
    };
  }
}
