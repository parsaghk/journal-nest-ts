import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetSingleArticleCategoryResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly title: string;
}
