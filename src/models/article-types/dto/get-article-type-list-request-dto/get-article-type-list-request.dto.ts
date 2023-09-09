import { SortArticleTypesDto } from '@models/article-types';
import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterArticleTypesDto } from './filter-article-types.dto';
export class GetArticleTypeListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterArticleTypesDto)
  public readonly filters = new FilterArticleTypesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortArticleTypesDto)
  public readonly sorts: SortArticleTypesDto = new SortArticleTypesDto();
}
