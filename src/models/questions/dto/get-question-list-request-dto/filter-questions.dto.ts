import { AbstractFilterDto } from '@shared/dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QuestionTypeEnum } from '../../enums';

export class FilterQuestionsDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly content?: string;

  @IsOptional()
  @IsEnum(QuestionTypeEnum)
  public readonly type?: QuestionTypeEnum;
}
