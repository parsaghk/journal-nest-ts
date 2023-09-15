import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ArticleFileType } from '@models/article-file-types';
import { Storage } from '@models/storage';
import { AbstractEntity } from '@shared/entities';
import { Article } from './article.entity';

@Entity()
export class ArticleFile extends AbstractEntity {
  @Property()
  public readonly description: string;

  @ManyToOne(() => ArticleFileType)
  public readonly type: ArticleFileType;

  @ManyToOne(() => Article)
  public readonly article: Article;

  @ManyToOne(() => Storage)
  public readonly storage: Storage;

  public constructor(description: string) {
    super();
    this.description = description;
  }
}
