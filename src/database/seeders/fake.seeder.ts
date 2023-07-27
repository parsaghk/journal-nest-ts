import { ArticleTypeFactory } from '@database/factories';
import { ArticleCategoryFactory } from '@database/factories/article-category.factory';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class FakeSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new ArticleTypeFactory(em).create(10);
    await new ArticleCategoryFactory(em).create(10);
  }
}
