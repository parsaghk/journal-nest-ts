import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterUsersDto } from './filter-users.dto';
import { SortUsersDto } from './sort-users.dto';
export class GetUserListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterUsersDto)
  public readonly filters = new FilterUsersDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortUsersDto)
  public readonly sorts: SortUsersDto = new SortUsersDto();
}
