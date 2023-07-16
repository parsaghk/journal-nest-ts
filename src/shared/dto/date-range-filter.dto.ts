import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeFilterDto {
  @IsOptional()
  @IsDateString()
  public readonly from?: string;

  @IsOptional()
  @IsDateString()
  public readonly to?: string;
}
