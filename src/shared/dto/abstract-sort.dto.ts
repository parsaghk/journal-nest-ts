import { SortEnum } from '@shared/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class AbstractSortDto {
  @IsOptional()
  @IsEnum(SortEnum)
  public readonly id?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  public readonly createdAt?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  public readonly updatedAt?: SortEnum;
}
