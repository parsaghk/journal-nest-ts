import { EntityId } from '@shared/types';
import { IsUUID } from 'class-validator';

export class ProcessArticleRequestDto {
  @IsUUID()
  public readonly jurorId: EntityId;

  @IsUUID()
  public readonly editorId: EntityId;
}
