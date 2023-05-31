import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { CreateJobDto } from 'src/dto/create-job.dto';
import derivedAddress from 'src/utils/derivedAddress';
import generateMnemonic from 'src/utils/generateMnemonic';
import * as agreementContractJSON from './assets/Agreement.json';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  agreementContract: ethers.Contract;

  constructor(private readonly configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get('INFURA_API_URL'),
    );

    this.agreementContract = new ethers.Contract(
      this.configService.get('TOKEN_CONTRACT_ADDRESS'),
      agreementContractJSON.abi,
      this.provider,
    );
  }

  async getCreateWallet(): Promise<object> {
    const mnemonic = await generateMnemonic();
    const walletAddress = derivedAddress(mnemonic);

    return { mnemonic, walletAddress };
  }

  async createJob(createJobDto: CreateJobDto): Promise<object> {
    const { jobTitle, companyName, workHourPerWeek, totalSalary } =
      createJobDto;
    const wallet = new ethers.Wallet(createJobDto.privateKey, this.provider);
    const signer = wallet.connect(this.provider);
    const agreementContractAddress = this.agreementContract.connect(signer);

    const createJob = await agreementContractAddress.addJob(
      jobTitle,
      companyName,
      workHourPerWeek,
      totalSalary,
    );

    return {
      jobTitle,
      companyName,
      workHourPerWeek,
      totalSalary,
      hash: createJob.hash,
    };
  }
}
