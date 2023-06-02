import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from './dto/create-job.dto';
import { CreateAndSignAgreementDto } from './dto/create-and-sign-agreement-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('contracts')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wallets')
  createWallet(): Promise<object> {
    return this.appService.createWallet();
  }

  @Get('/balances')
  balance(@Query('walletAddress') walletAddress: string): Promise<object> {
    return this.appService.balance(walletAddress);
  }

  @Post('/jobs')
  createJob(
    @Headers('employerPrivateKey') employerPrivateKey: string,
    @Body() createJobDto: CreateJobDto,
  ): Promise<object> {
    return this.appService.createJob(createJobDto, employerPrivateKey);
  }

  @Get('/jobs/:jobBlockchainId')
  readJobById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('jobBlockchainId') jobBlockchainId: string,
  ): Promise<object> {
    return this.appService.readJobById(jobBlockchainId, publicPrivateKey);
  }

  @Post('/agreements')
  createAndSignAgreement(
    @Headers('userPrivateKey') userPrivateKey: string,
    @Body() createAndSignAgreementDto: CreateAndSignAgreementDto,
  ): Promise<object> {
    return this.appService.createAndSignAgreement(
      createAndSignAgreementDto,
      userPrivateKey,
    );
  }

  @Get('/agreements/:agreementBlockchainId')
  readAgreementById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('agreementBlockchainId') agreementBlockchainId: string,
  ): Promise<object> {
    return this.appService.readAgreementById(
      agreementBlockchainId,
      publicPrivateKey,
    );
  }

  @Get('/users/:userBlockchainId')
  readUserById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('userBlockchainId') userBlockchainId: string,
  ): Promise<object> {
    return this.appService.readUserById(userBlockchainId, publicPrivateKey);
  }
}
