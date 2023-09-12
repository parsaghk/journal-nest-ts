import { ArticleFileTypeFactory } from '@database/factories';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class ArticleFileTypeSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new ArticleFileTypeFactory(em).create(10);
  }
}
