import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterArticlesDto } from './filter-articles.dto';
import { SortArticlesDto } from './sort-articles.dto';

export class getArticleListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterArticlesDto)
  public readonly filters: FilterArticlesDto = new FilterArticlesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortArticlesDto)
  public readonly sorts: SortArticlesDto = new SortArticlesDto();
}
