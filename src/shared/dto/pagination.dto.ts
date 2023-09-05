import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  public readonly pageSize: number = 10;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly pageIndex: number = 1;
}
