import { AppConfigModule, AppConfigService } from '@config/app';
import { DatabaseConfigModule, DatabaseConfigService } from '@config/database';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { nonEnvMikroOrmConfiguration } from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: DATABASE_CONTEXT_NAME_CONSTANT,
      imports: [DatabaseConfigModule, AppConfigModule],
      useFactory: (
        databaseConfig: DatabaseConfigService,
        appConfig: AppConfigService,
      ) => {
        const dbName = `${databaseConfig.dbName}:${appConfig.env}`;
        return {
          ...nonEnvMikroOrmConfiguration,
          port: databaseConfig.port,
          user: databaseConfig.user,
          host: databaseConfig.host,
          password: databaseConfig.password,
          dbName: dbName,
        };
      },
      inject: [DatabaseConfigService, AppConfigService],
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
