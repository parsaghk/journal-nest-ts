import { SortArticleCategoriesDto } from '@models/article-categories/dto/get-article-category-list-request-dto/sort-article-categories.dto';
import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterArticleCategoriesDto } from './filter-article-categories.dto';
export class GetArticleCategoryListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterArticleCategoriesDto)
  public readonly filters = new FilterArticleCategoriesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortArticleCategoriesDto)
  public readonly sorts: SortArticleCategoriesDto =
    new SortArticleCategoriesDto();
}
