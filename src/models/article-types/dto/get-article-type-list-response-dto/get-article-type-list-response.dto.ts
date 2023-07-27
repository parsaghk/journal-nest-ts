import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetArticleTypeListResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly title: string;
}
