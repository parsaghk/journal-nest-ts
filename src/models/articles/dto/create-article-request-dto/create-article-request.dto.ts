import { EntityId } from '@shared/types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ArticleQuestionRequestDto } from './article-question-request.dto';

export class CreateArticleRequestDto {
  @IsUUID()
  public readonly articleTypeId: EntityId;

  @IsUUID()
  public readonly articleCategoryId: EntityId;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  public readonly fileIdList: EntityId[];

  @IsOptional()
  @IsString()
  public readonly conflictOfInterest?: string;

  @IsOptional()
  @IsString()
  public readonly competingInterestStatement?: string;

  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly abstract: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  public readonly keywordList: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleQuestionRequestDto)
  public readonly articleQuestionList: ArticleQuestionRequestDto[];
}
