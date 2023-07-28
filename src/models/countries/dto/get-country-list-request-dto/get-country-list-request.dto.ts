import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterCountriesDto } from './filter-countries.dto';
import { SortCountriesDto } from './sort-countries.dto';
export class GetCountryListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterCountriesDto)
  public readonly filters = new FilterCountriesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortCountriesDto)
  public readonly sorts: SortCountriesDto = new SortCountriesDto();
}
