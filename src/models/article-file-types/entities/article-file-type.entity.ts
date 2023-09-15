import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { ArticleFile } from '@models/articles';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class ArticleFileType extends AbstractEntity {
  @Property({ unique: true })
  public readonly title: string;

  @OneToMany(() => ArticleFile, (file) => file.type)
  public readonly fileList = new Collection<ArticleFile>(this);

  public constructor(title: string) {
    super();
    this.title = title;
  }
}
