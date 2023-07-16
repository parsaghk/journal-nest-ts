import { Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from './postgres/postgres-database-provider.module';
@Module({
  imports: [PostgresDatabaseProviderModule],
})
export class DatabaseProviderModule {}
