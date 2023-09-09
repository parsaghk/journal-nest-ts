import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppEnvEnum } from '@shared/enums';
import { AppConfigService } from './app-config.service';
import { appConfiguration } from './app-configuration';
import Joi = require('joi');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .required()
          .valid(...Object.values(AppEnvEnum)),
        APP_PORT: Joi.number().required(),
        APP_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
