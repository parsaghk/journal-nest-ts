import { Options as MikroOrmOptions } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { AppEnvEnum } from '@shared/enums';
import { config as dotenvConfig } from 'dotenv';
import * as process from 'process';

dotenvConfig();

const logger = new Logger('MikroORM');

export const nonEnvMikroOrmConfiguration: Omit<
  MikroOrmModuleOptions,
  'host' | 'dbName' | 'port' | 'password'
> = {
  driver: PostgreSqlDriver,
  allowGlobalContext: true,
  registerRequestContext: false,
  entities: [
    './dist/models/**/entities/*.entity.js',
    './dist/auth/entities/*.entity.js',
  ],
  entitiesTs: [
    './src/models/**/entities/*.entity.ts',
    './src/auth/entities/*.entity.ts',
  ],
  highlighter: new SqlHighlighter(),
  logger: logger.log.bind(logger),
  migrations: {
    path: 'dist/database/migrations/',
    pathTs: 'src/database/migrations/',
    snapshot: false,
  },
  seeder: {
    path: 'dist/database/seeders/',
    pathTs: 'src/database/seeders/',
    defaultSeeder:
      process.env.NODE_ENV === AppEnvEnum.DEV
        ? 'DatabaseSeeder'
        : 'InitialSeeder',
  },
};
const mikroOrmConfiguration: MikroOrmOptions = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB_NAME,
  ...nonEnvMikroOrmConfiguration,
};
export default mikroOrmConfiguration;
