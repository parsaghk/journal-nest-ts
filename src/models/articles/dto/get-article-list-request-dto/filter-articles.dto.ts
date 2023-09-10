import { ArticleStatusEnum } from '@models/articles/enums';
import { AbstractFilterDto } from '@shared/dto';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterArticlesDto extends AbstractFilterDto {
  @IsOptional()
  @IsEnum(ArticleStatusEnum)
  public readonly status?: ArticleStatusEnum;
}
