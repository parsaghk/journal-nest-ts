import { AuthModule } from '@auth/auth.module';
import { MikroOrmExceptionFilter } from '@common/filters';
import { ConfigModule } from '@config/config.module';
import { ModelsModule } from '@models/models.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ProvidersModule } from '@providers/providers.module';

@Module({
  imports: [AuthModule, ConfigModule, ModelsModule, ProvidersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MikroOrmExceptionFilter,
    },
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
