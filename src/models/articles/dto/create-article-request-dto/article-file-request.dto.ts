import { EntityId } from '@shared/types';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ArticleFileRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsUUID()
  public readonly typeId: EntityId;

  @IsUUID()
  public readonly storageId: EntityId;
}
