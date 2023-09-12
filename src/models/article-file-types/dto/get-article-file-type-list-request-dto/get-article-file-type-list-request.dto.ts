import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterArticleFileTypesDto } from './filter-article-file-types.dto';
import { SortArticleFileTypesDto } from './sort-article-file-types.dto';
export class GetArticleFileTypeListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterArticleFileTypesDto)
  public readonly filters = new FilterArticleFileTypesDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortArticleFileTypesDto)
  public readonly sorts: SortArticleFileTypesDto =
    new SortArticleFileTypesDto();
}
