import { UserSummaryInfoDto } from '@auth/dto';
import { ArticleStatusEnum } from '@models/articles/enums';
import { RoleEnum } from '@models/users';
import { AbstractEntityDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';

export class ArticleStatusHistory extends AbstractEntityDto {
  @Expose()
  public readonly status: ArticleStatusEnum;

  @Expose()
  public readonly role: RoleEnum;

  @Expose()
  @Type(() => UserSummaryInfoDto)
  public readonly affectedBy: UserSummaryInfoDto;
}
