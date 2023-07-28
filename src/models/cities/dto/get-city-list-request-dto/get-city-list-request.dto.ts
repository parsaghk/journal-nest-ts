import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterCitiesDto } from './filter-cities.dto';
import { SortCitiesDto } from './sort-cities.dto';
export class GetCityListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterCitiesDto)
  public readonly filters = new FilterCitiesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortCitiesDto)
  public readonly sorts: SortCitiesDto = new SortCitiesDto();
}
