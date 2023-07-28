import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { City } from '@models/cities';
import { Country } from '@models/countries';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class State extends AbstractEntity {
  @Property()
  public readonly name: string;

  @ManyToOne(() => Country)
  public readonly country: Country;

  @OneToMany(() => City, (city) => city.state, {
    cascade: [Cascade.PERSIST],
  })
  public cityList = new Collection<City>(this);

  public constructor(name: string) {
    super();
    this.name = name;
  }
}
