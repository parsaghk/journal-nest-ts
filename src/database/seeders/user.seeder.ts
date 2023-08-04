import { UserFactory } from '@database/factories';
import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { City } from '@models/cities';

export class UserSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const city = await em.findOne(City, {});
    new UserFactory(em)
      .each((user) => {
        wrap(user).assign({ city });
      })
      .make(100);
  }
}
