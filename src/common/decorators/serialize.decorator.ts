import { SerializeInterceptor } from '@common/interceptors';
import { UseInterceptors } from '@nestjs/common';

export function Serialize<T>(dto: { new (): T }) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
