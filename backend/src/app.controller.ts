import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { CreateAndSignAgreementDto } from 'src/dto/create-and-sign-agreement-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('contracts')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wallets')
  getCreateWallet(): Promise<object> {
    return this.appService.getCreateWallet();
  }

  @Post('/jobs')
  createJob(
    @Headers('employerPrivateKey') employerPrivateKey: string,
    @Body() createJobDto: CreateJobDto,
  ): Promise<object> {
    return this.appService.createJob(createJobDto, employerPrivateKey);
  }

  @Get('/jobs/:jobId')
  readJobById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('jobId') jobId: string,
  ): Promise<object> {
    return this.appService.readJobById(jobId, publicPrivateKey);
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

  @Get('/agreements/:agreementId')
  readAgreementById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('agreementId') agreementId: string,
  ): Promise<object> {
    return this.appService.readAgreementById(agreementId, publicPrivateKey);
  }

  @Get('/users/:userId')
  readUserById(
    @Headers('publicPrivateKey') publicPrivateKey: string,
    @Param('userId') userId: string,
  ): Promise<object> {
    return this.appService.readUserById(userId, publicPrivateKey);
  }
}
