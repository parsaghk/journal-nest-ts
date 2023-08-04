import { ArticleTypeFactory } from '@database/factories';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class ArticleTypeSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new ArticleTypeFactory(em).create(10);
  }
}
