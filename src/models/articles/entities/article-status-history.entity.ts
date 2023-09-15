import { Enum, ManyToOne } from '@mikro-orm/core';
import { User } from '@models/users';
import { AbstractEntity } from '@shared/entities';
import { ArticleStatusEnum } from '../enums';

export class ArticleStatusHistory extends AbstractEntity {
  @Enum(() => ArticleStatusEnum)
  public readonly status: ArticleStatusEnum;

  @ManyToOne(() => User)
  public readonly changedBy: User;

  public constructor(status: ArticleStatusEnum) {
    super();
    this.status = status;
  }
}
