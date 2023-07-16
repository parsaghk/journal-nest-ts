import { EntityId } from '@shared/types';
import { Expose } from 'class-transformer';

export class AbstractEntityDto {
  @Expose()
  public readonly id: EntityId;

  @Expose()
  public readonly createdAt: Date;

  @Expose()
  public readonly updatedAt: Date;
}
