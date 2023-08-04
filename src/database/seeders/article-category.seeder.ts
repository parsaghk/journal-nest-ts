import { ArticleCategoryFactory } from '@database/factories';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class ArticleCategorySeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new ArticleCategoryFactory(em).create(10);
  }
}
