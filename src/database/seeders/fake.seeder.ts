import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ArticleCategorySeeder } from './article-category.seeder';
import { ArticleFileTypeSeeder } from './article-file-type.seeder';
import { ArticleTypeSeeder } from './article-type.seeder';
import { CountrySeeder } from './country.seeder';
import { QuestionSeeder } from './question.seeder';
import { UserSeeder } from './user.seeder';

export class FakeSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      ArticleCategorySeeder,
      ArticleTypeSeeder,
      ArticleFileTypeSeeder,
      CountrySeeder,
      QuestionSeeder,
      UserSeeder,
    ]);
  }
}
