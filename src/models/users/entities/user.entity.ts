import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { City } from '@models/cities';
import { Country } from '@models/countries';
import { State } from '@models/states';
import { AbstractEntity } from '@shared/entities';
import { RoleEnum, UserStatus } from '../enums';

@Entity()
export class User extends AbstractEntity {
  @Property()
  public readonly firstName: string;

  @Property({ nullable: true })
  public readonly middleName?: string;

  @Property()
  public readonly lastName: string;

  @Property({ unique: true })
  public readonly username: string;

  @Property()
  public readonly email: string;

  @Property()
  public readonly password: string;

  @Enum({ items: () => UserStatus, default: UserStatus.ACTIVE })
  public readonly status: UserStatus = UserStatus.ACTIVE;

  @Property({ nullable: true })
  public readonly position?: string;

  @Property({ nullable: true })
  public readonly institution?: string;

  @Property({ nullable: true })
  public readonly department?: string;

  @Property({ nullable: true })
  public readonly address?: string;

  @ManyToOne(() => City, { nullable: true })
  public readonly city?: City;

  @ManyToOne(() => State, { nullable: true })
  public readonly state?: State;

  @ManyToOne(() => Country)
  public readonly country: Country;

  @Property({ nullable: true })
  public readonly postalCode?: string;

  @Enum({ items: () => RoleEnum, array: true, default: [RoleEnum.USER] })
  public readonly roleList: RoleEnum[] = [RoleEnum.USER];
}
