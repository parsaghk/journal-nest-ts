import { UserSummaryInfoDto } from '@auth/dto';
import { ArticleStatusEnum } from '@models/articles/enums';
import { AbstractEntityDto } from '@shared/dto';
import { Expose, Type } from 'class-transformer';

export class GetArticleListResponseDto extends AbstractEntityDto {
  @Expose()
  public readonly status: ArticleStatusEnum;

  @Expose()
  @Type(() => UserSummaryInfoDto)
  public readonly owner: UserSummaryInfoDto;
}
