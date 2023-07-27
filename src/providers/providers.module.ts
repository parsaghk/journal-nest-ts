import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './database/database-provider.module';
import { I18nProviderModule } from './i18n/i18n-provider.module';
@Module({
  imports: [DatabaseProviderModule, I18nProviderModule],
})
export class ProvidersModule {}
