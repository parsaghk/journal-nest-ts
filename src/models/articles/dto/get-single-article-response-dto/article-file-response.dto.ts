import { GetSingleArticleFileTypeResponseDto } from '@models/article-file-types';
import { StorageResponseDto } from '@models/storage';
import { AbstractEntityDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';

export class ArticleFileResponse extends AbstractEntityDto {
  @Expose()
  public readonly description?: string;

  @Expose()
  @Type(() => GetSingleArticleFileTypeResponseDto)
  public readonly type: GetSingleArticleFileTypeResponseDto;

  @Expose()
  @Type(() => StorageResponseDto)
  public readonly storage: StorageResponseDto;
}
