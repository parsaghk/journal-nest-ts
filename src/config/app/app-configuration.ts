import { registerAs } from '@nestjs/config';

export const appConfiguration = registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  url: process.env.APP_URL,
}));
