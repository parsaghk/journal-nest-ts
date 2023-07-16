import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import * as Joi from 'joi';
import { authConfiguration } from './auth.configuration';
import { AuthConfigService } from './auth-config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [authConfiguration],
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
      }),
    }),
  ],
  providers: [NestConfigService, AuthConfigService],
  exports: [NestConfigService, AuthConfigService],
})
export class AuthConfigModule {}
