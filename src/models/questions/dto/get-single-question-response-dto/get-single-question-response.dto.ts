import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { QuestionTypeEnum } from '../../enums';

export class GetSingleQuestionResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly content: string;

  @IsEnum(QuestionTypeEnum)
  public readonly type: QuestionTypeEnum;
}
