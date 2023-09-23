import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortEnum } from '@shared/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class AbstractSortDto {
  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ enum: SortEnum, name: 'sorts[id]' })
  public readonly id?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ enum: SortEnum, name: 'sorts[createdAt]' })
  public readonly createdAt?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ enum: SortEnum, name: 'sorts[updatedAt]' })
  public readonly updatedAt?: SortEnum;
}
