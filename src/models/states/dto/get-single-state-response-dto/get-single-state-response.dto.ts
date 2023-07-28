import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetSingleStateResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly name: string;
}
