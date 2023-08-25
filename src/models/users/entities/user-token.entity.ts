import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { AbstractEntity } from '@shared/entities';
import { User } from './user.entity';
@Entity()
export class UserToken extends AbstractEntity {
  @ManyToOne(() => User)
  public readonly user: User;

  @Property()
  public readonly securityTimestamp: string;

  public constructor(securityTimestamp: string, user: User) {
    super();
    this.securityTimestamp = securityTimestamp;
    this.user = user;
  }
}
