import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetSingleArticleTypeResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly title: string;
}
