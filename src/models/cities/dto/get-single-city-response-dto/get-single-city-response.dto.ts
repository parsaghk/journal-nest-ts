import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetSingleCityResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly name: string;
}
