import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from 'src/dto/create-job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wallets')
  getCreateWallet(): Promise<object> {
    return this.appService.getCreateWallet();
  }

  @Post('/jobs')
  createJob(@Body() createJobDto: CreateJobDto): Promise<object> {
    return this.appService.createJob(createJobDto);
  }

  // @Post('/agreement')
  // createAgreement(
  //   @Body
  // ): Promise<object> {
  //   return this.appService.createAgreement();
  // }
}
