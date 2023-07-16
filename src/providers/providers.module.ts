import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './database/database-provider.module';
@Module({
  imports: [DatabaseProviderModule],
})
export class ProvidersModule {}
