import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  jobTitle: string;
  @ApiProperty()
  companyName: string;
  @ApiProperty()
  workHourPerWeek: number;
  @ApiProperty()
  salaryPerHour: number;
}
