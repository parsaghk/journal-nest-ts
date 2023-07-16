import { PrimaryKey, Property, UuidType } from '@mikro-orm/core';
import { EntityId } from '@shared/types';
import { v4 } from 'uuid';
import moment = require('moment');

export abstract class AbstractEntity {
  @PrimaryKey({ type: UuidType })
  public id: EntityId = v4();

  @Property({ columnType: 'timestamptz' })
  public createdAt: Date = moment().utc().toDate();

  @Property({
    columnType: 'timestamptz',
    onUpdate: () => moment().utc().toDate(),
  })
  public updatedAt: Date = moment().utc().toDate();
}
