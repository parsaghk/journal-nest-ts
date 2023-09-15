import { GetSingleQuestionResponseDto } from '@models/questions';
import { Expose, Type } from 'class-transformer';

export class ArticleQuestionResponseDto {
  @Expose()
  @Type(() => GetSingleQuestionResponseDto)
  public readonly question: GetSingleQuestionResponseDto;

  @Expose()
  public readonly reply: string;
}
