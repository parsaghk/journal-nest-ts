import { IsNumber, IsOptional } from 'class-validator';

export class NumberRangeFilterDto {
  @IsOptional()
  @IsNumber()
  public readonly from?: number;

  @IsOptional()
  @IsNumber()
  public readonly to?: number;
}
