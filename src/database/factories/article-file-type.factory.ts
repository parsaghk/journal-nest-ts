import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { ArticleFileType } from '@models/article-file-types';

export class ArticleFileTypeFactory extends Factory<ArticleFileType> {
  public model = ArticleFileType;

  protected definition(faker: Faker): EntityData<ArticleFileType> {
    return {
      title: faker.commerce.product(),
    };
  }
}
