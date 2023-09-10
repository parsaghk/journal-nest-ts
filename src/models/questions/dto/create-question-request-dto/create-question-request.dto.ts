import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestionTypeEnum } from '../../enums';

export class CreateQuestionRequestDto {
  @IsNotEmpty()
  @IsString()
  public readonly content: string;

  @IsEnum(QuestionTypeEnum)
  public readonly type: QuestionTypeEnum;
}
