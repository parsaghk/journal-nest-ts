import { AppConfigModule } from '@config/app';
import { Module } from '@nestjs/common';
import { AuthConfigModule } from './auth';

@Module({
  imports: [AppConfigModule, AuthConfigModule],
})
export class ConfigModule {}
