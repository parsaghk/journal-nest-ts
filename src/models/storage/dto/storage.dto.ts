import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class StorageDto extends AbstractEntityDto {
  @Expose()
  public readonly mimeType: string;

  @Expose()
  public readonly filePath: string;

  @Expose()
  public readonly extension: string;
}
