import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { ArticleCategory } from '@models/article-categories';
import { ArticleType } from '@models/article-types';
import { User } from '@models/users';
import { AbstractEntity } from '@shared/entities';
import { ArticleStatusEnum } from '../enums';

@Entity()
export class Article extends AbstractEntity {
  @Property()
  public readonly title: string;

  @Property()
  public readonly abstract: string;

  @Property({ nullable: true })
  public readonly conflictOfInterest?: string;

  @Property({ nullable: true })
  public readonly competingInterestStatement?: string;

  @Property({ type: 'json' })
  public readonly keywordList: string[];

  @ManyToOne(() => ArticleType)
  public readonly type: ArticleType;

  @Enum({
    items: () => ArticleStatusEnum,
    default: ArticleStatusEnum.PROCESSING,
  })
  public readonly status: ArticleStatusEnum;

  @Property({ type: 'json' })
  public readonly fileList: Storage[];

  @ManyToOne(() => ArticleCategory)
  public readonly category: ArticleCategory;

  @ManyToOne(() => User)
  public readonly owner: User;

  public constructor(
    type: ArticleType,
    category: ArticleCategory,
    title: string,
    abstract: string,
    keywordList: string[],
    owner: User,
  ) {
    super();
    this.title = title;
    this.abstract = abstract;
    this.keywordList = keywordList;
    this.type = type;
    this.category = category;
    this.owner = owner;
  }
}
