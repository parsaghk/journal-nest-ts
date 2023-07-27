import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { ArticleType } from '@models/article-types';

export class ArticleTypeFactory extends Factory<ArticleType> {
  public model = ArticleType;

  protected definition(faker: Faker): EntityData<ArticleType> {
    return {
      title: faker.commerce.product(),
    };
  }
}
