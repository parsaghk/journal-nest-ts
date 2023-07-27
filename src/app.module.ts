import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@config/config.module';
import { ModelsModule } from '@models/models.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ProvidersModule } from '@providers/providers.module';

@Module({
  imports: [AuthModule, ConfigModule, ModelsModule, ProvidersModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
