import { UserSummaryInfoDto } from '@auth/dto';
import { GetSingleArticleCategoryResponseDto } from '@models/article-categories';
import { GetSingleArticleTypeResponseDto } from '@models/article-types';
import { ArticleStatusEnum } from '@models/articles/enums';
import { Expose, Type } from 'class-transformer';

export class GetSingleArticleResponseDto {
  @Expose()
  @Type(() => UserSummaryInfoDto)
  public readonly owner: UserSummaryInfoDto;

  @Expose()
  @Type(() => GetSingleArticleTypeResponseDto)
  public readonly type: GetSingleArticleTypeResponseDto;

  @Expose()
  @Type(() => GetSingleArticleCategoryResponseDto)
  public readonly category: GetSingleArticleCategoryResponseDto;

  @Expose()
  public readonly status: ArticleStatusEnum;

  @Expose()
  public readonly title: string;

  @Expose()
  public readonly abstract: string;

  @Expose()
  public readonly keywordList: string[];

  @Expose()
  public readonly conflictOfInterest?: string;

  @Expose()
  public readonly competingInterestStatement?: string;
}
