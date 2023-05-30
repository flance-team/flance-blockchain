import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { CreateJobDto } from 'src/dto/create-job.dto';
import derivedAddress from 'src/utils/derivedAddress';
import generateMnemonic from 'src/utils/generateMnemonic';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  tokenContract: ethers.Contract;

  constructor(private readonly configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get('INFURA_API_URL'),
    );
  }

  async getCreateWallet(): Promise<object> {
    const mnemonic = await generateMnemonic();
    const walletAddress = derivedAddress(mnemonic);

    return { mnemonic, walletAddress };
  }

  async createJob(createJobDto: CreateJobDto): Promise<object> {
    return { createJobDto };
  }
}
