import { EntityId } from '@shared/types';

export type JwtPayload = {
  sub: EntityId;
  securityTimestamp: string;
};
