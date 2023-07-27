import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class ArticleCategory extends AbstractEntity {
  @Property()
  public title: string;

  public constructor(title: string) {
    super();
    this.title = title;
  }
}
