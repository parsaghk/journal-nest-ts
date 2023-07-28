import { AbstractSortDto } from '@shared/dto';
import { SortEnum } from '@shared/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class SortCountriesDto extends AbstractSortDto {
  @IsOptional()
  @IsEnum(SortEnum)
  public readonly name?: SortEnum;
}
