import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { AbstractEntity } from '@shared/entities';
import { ArticleCommentTypeEnum } from '../enums';
import { Article } from './article.entity';

@Entity()
export class ArticleReviewerComment extends AbstractEntity {
  @Property()
  public readonly content: string;

  @Enum(() => ArticleCommentTypeEnum)
  public readonly type: ArticleCommentTypeEnum;

  @ManyToOne(() => Article)
  public readonly article: Article;

  public constructor(content: string, type: ArticleCommentTypeEnum) {
    super();
    this.content = content;
    this.type = type;
  }
}
