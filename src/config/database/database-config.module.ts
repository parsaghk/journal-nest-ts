import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import * as Joi from 'joi';
import { databaseConfiguration } from './database.configuration';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [databaseConfiguration],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [NestConfigService, DatabaseConfigService],
  exports: [NestConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
