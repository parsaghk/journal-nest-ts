import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { City } from '@models/cities';
import { AbstractEntity } from '@shared/entities';
import { UserStatus } from '../enums';

@Entity()
export class User extends AbstractEntity {
  @Property()
  public firstName: string;

  @Property({ nullable: true })
  public middleName?: string;

  @Property()
  public lastName: string;

  @Property()
  public username: string;

  @Property()
  public email: string;

  @Property()
  public password: string;

  @Enum({ items: () => UserStatus, default: UserStatus.ACTIVE })
  public status: UserStatus;

  @Property({ nullable: true })
  public position?: string;

  @Property({ nullable: true })
  public institution?: string;

  @Property({ nullable: true })
  public department?: string;

  @Property({ nullable: true })
  public address?: string;

  @ManyToOne(() => City, { nullable: true })
  public city?: City;

  @Property({ nullable: true })
  public postalCode?: string;
}
