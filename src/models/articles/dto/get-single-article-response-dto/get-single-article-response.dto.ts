import { GetSingleArticleCategoryResponseDto } from '@models/article-categories';
import { GetSingleArticleTypeResponseDto } from '@models/article-types';
import { ArticleStatusEnum } from '@models/articles/enums';
import { Expose, Type } from 'class-transformer';
import { ArticleAuthorResponseDto } from './article-author-response-dto';
import { ArticleFileResponse } from './article-file-response.dto';
import { ArticleQuestionResponseDto } from './article-question-response.dto';
import { ArticleStatusHistory } from './article-status-history.dto';

export class GetSingleArticleResponseDto {
  @Expose()
  public readonly subject: string;

  @Expose()
  public readonly shortDescription: string;

  @Expose()
  @Type(() => ArticleFileResponse)
  public readonly fileList: ArticleFileResponse[];

  @Expose()
  @Type(() => ArticleQuestionResponseDto)
  public readonly questionList: ArticleQuestionResponseDto[];

  @Expose()
  @Type(() => ArticleStatusHistory)
  public readonly statusHistoryList: ArticleStatusHistory[];

  @Expose()
  @Type(() => ArticleAuthorResponseDto)
  public readonly owner: ArticleAuthorResponseDto;

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
