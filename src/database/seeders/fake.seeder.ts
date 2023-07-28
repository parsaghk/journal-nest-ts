import { ArticleTypeFactory } from '@database/factories';
import { ArticleCategoryFactory } from '@database/factories/article-category.factory';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { City as CityEntity } from '@models/cities';
import { Country as CountryEntity } from '@models/countries';
import { State as StateEntity } from '@models/states';
import { City, Country, State } from 'country-state-city';

export class FakeSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await new ArticleTypeFactory(em).create(10);
    await new ArticleCategoryFactory(em).create(10);

    const countryList = Country.getAllCountries().map((country) => {
      const stateList = State.getStatesOfCountry(country.isoCode).map(
        (state) => {
          const cityList = City.getCitiesOfState(
            country.isoCode,
            state.isoCode,
          ).map((city) => new CityEntity(city.name));
          const stateEntity = new StateEntity(state.name);
          wrap(stateEntity).assign({ cityList });
          return stateEntity;
        },
      );
      const countryEntity = new CountryEntity(country.name);
      wrap(countryEntity).assign({ stateList });
      return countryEntity;
    });
    await em.persistAndFlush(countryList);
  }
}
