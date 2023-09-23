import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  @ApiPropertyOptional({ name: 'pagination[pageSize]', default: 10 })
  public readonly pageSize: number = 10;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({ name: 'pagination[pageIndex]', default: 1 })
  public readonly pageIndex: number = 1;
}
