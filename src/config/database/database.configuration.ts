import { registerAs } from '@nestjs/config';

export const databaseConfiguration = registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB_NAME,
}));
