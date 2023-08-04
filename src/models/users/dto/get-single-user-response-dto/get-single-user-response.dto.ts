import { City } from '@models/cities';
import { UserStatus } from '@models/users';
import { AbstractEntityDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';

export class GetSingleUserResponseDto extends AbstractEntityDto {
  @Expose()
  public firstName: string;

  @Expose()
  public middleName?: string;

  @Expose()
  public lastName: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public status: UserStatus;

  @Expose()
  public position?: string;

  @Expose()
  public institution?: string;

  @Expose()
  public department?: string;

  @Expose()
  public address?: string;

  @Expose()
  @Type(() => City)
  public city?: City;

  @Expose()
  public postalCode?: string;
}
