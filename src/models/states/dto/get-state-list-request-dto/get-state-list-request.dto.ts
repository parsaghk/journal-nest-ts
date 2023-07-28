import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterStatesDto } from './filter-states.dto';
import { SortStatesDto } from './sort-states.dto';
export class GetStateListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterStatesDto)
  public readonly filters = new FilterStatesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortStatesDto)
  public readonly sorts: SortStatesDto = new SortStatesDto();
}
