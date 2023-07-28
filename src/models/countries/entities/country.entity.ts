import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { State } from '@models/states';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class Country extends AbstractEntity {
  @Property()
  public name: string;

  @OneToMany(() => State, (state) => state.country, {
    cascade: [Cascade.PERSIST],
  })
  public readonly stateList = new Collection<State>(this);

  public constructor(name: string) {
    super();
    this.name = name;
  }
}
