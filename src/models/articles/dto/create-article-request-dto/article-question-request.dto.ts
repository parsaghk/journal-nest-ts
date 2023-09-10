import { EntityId } from '@shared/types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ArticleQuestionRequestDto {
  @IsUUID()
  public readonly questionId: EntityId;

  @IsString()
  @IsNotEmpty()
  public readonly reply: string;
}
