import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionFactory } from '../factories';

export class QuestionSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new QuestionFactory(em).create(10);
  }
}
