import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@config/config.module';
import { ModelsModule } from '@models/models.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';

@Module({
  imports: [AuthModule, ConfigModule, ModelsModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
