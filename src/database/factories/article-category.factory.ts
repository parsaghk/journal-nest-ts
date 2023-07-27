import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { ArticleCategory } from '@models/article-categories';

export class ArticleCategoryFactory extends Factory<ArticleCategory> {
  public model = ArticleCategory;

  protected definition(faker: Faker): EntityData<ArticleCategory> {
    return {
      title: faker.commerce.product(),
    };
  }
}
