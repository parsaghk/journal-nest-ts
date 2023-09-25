import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { RoleEnum, User } from '@models/users';
import { AbstractEntity } from '@shared/entities';
import { ArticleStatusEnum } from '../enums';
import { Article } from './article.entity';

@Entity()
export class ArticleStatusHistory extends AbstractEntity {
  @Enum(() => ArticleStatusEnum)
  public readonly status: ArticleStatusEnum;

  @ManyToOne(() => User)
  public readonly affectedBy: User;

  @Enum({ items: () => RoleEnum, default: RoleEnum.USER })
  public readonly role: RoleEnum;

  @ManyToOne(() => Article)
  public readonly article: Article;

  public constructor(status: ArticleStatusEnum, role: RoleEnum) {
    super();
    this.status = status;
    this.role = role;
  }
}
