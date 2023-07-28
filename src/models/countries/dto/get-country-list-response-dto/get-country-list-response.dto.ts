import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetCountryListResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly name: string;
}
