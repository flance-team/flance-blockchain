import { ApiProperty } from '@nestjs/swagger';

export class CreateAndSignAgreementDto {
  @ApiProperty()
  jobBlockchainId: number;
  @ApiProperty()
  userName: string;
  @ApiProperty({
    description:
      'Contract duration calculated in days, please input number of days',
  })
  contractDuration: number;
}
