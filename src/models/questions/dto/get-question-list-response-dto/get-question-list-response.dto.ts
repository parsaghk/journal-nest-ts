import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';
import { QuestionTypeEnum } from '../../enums';

export class GetQuestionListResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly content: string;

  @Expose()
  public readonly type: QuestionTypeEnum;
}
