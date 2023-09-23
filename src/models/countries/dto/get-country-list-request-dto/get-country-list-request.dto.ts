import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({ type: () => FilterCountriesDto })
  public readonly filters: FilterCountriesDto = new FilterCountriesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  @ApiPropertyOptional({ type: () => PaginationDto })
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortCountriesDto)
  @ApiPropertyOptional({ type: () => SortCountriesDto })
  public readonly sorts: SortCountriesDto = new SortCountriesDto();
}
