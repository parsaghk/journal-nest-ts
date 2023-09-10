import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Question } from '@models/questions';
import { AbstractEntity } from '@shared/entities';
import { Article } from './article.entity';

@Entity()
export class ArticleQuestion extends AbstractEntity {
  @Property()
  public reply: string;

  @ManyToOne(() => Question)
  public readonly question: Question;

  @ManyToOne(() => Article)
  public readonly article: Article;

  public constructor(reply: string) {
    super();
    this.reply = reply;
  }
}
