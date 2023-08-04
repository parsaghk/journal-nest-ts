import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { City as CityEntity } from '@models/cities';
import { Country as CountryEntity } from '@models/countries';
import { State as StateEntity } from '@models/states';
import { City, Country, State } from 'country-state-city';

export class CountrySeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
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
