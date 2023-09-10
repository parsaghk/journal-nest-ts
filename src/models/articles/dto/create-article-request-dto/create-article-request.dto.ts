import { EntityId } from '@shared/types';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
}
