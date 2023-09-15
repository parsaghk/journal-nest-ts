import { RoleEnum, UserStatus } from '@models/users';
import { AbstractEntityDto } from '@shared/dto';
import { Expose } from 'class-transformer';

export class GetUserListResponseDto extends AbstractEntityDto {
  @Expose()
  public firstName: string;

  @Expose()
  @Expose()
  public lastName: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public status: UserStatus;

  @Expose()
  public readonly roleList: RoleEnum[];
}
