import { Cascade, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { State } from '@models/states';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class City extends AbstractEntity {
  @Property()
  public name: string;

  @ManyToOne(() => State, {
    cascade: [Cascade.PERSIST],
  })
  public state: State;

  public constructor(name: string) {
    super();
    this.name = name;
  }
}
