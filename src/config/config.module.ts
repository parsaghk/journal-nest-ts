import { AppConfigModule } from '@config/app';
import { Module } from '@nestjs/common';
import { AuthConfigModule } from './auth';
import { DatabaseConfigModule } from './database';

@Module({
  imports: [AppConfigModule, AuthConfigModule, DatabaseConfigModule],
})
export class ConfigModule {}
