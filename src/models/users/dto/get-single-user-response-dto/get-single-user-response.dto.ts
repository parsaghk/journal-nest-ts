import { City } from '@models/cities';
import { RoleEnum, UserStatus } from '@models/users';
import { AbstractEntityDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';

export class GetSingleUserResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly firstName: string;

  @Expose()
  public readonly middleName?: string;

  @Expose()
  public readonly lastName: string;

  @Expose()
  public readonly username: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly status: UserStatus;

  @Expose()
  public readonly position?: string;

  @Expose()
  public readonly institution?: string;

  @Expose()
  public readonly department?: string;

  @Expose()
  public readonly address?: string;

  @Expose()
  @Type(() => City)
  public readonly city?: City;

  @Expose()
  public readonly postalCode?: string;

  @Expose()
  public readonly roleList: RoleEnum[];
}
