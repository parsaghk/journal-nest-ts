import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class ArticleFileType extends AbstractEntity {
  @Property({ unique: true })
  public title: string;

  public constructor(title: string) {
    super();
    this.title = title;
  }
}
