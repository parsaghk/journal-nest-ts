import { UserFactory } from '@database/factories';
import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { City } from '@models/cities';

export class UserSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const [city] = await em.find(
      City,
      {},
      { limit: 1, populate: ['state.country'] },
    );
    new UserFactory(em)
      .each((user) => {
        wrap(user).assign({
          city,
          country: city?.state.country,
          state: city?.state,
        });
      })
      .make(100);
  }
}
