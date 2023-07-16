import { DatabaseConfigModule, DatabaseConfigService } from '@config/database';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { nonEnvMikroOrmConfiguration } from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: DATABASE_CONTEXT_NAME_CONSTANT,
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfig: DatabaseConfigService) => {
        return {
          ...nonEnvMikroOrmConfiguration,
          port: databaseConfig.port,
          user: databaseConfig.user,
          host: databaseConfig.host,
          password: databaseConfig.password,
          dbName: databaseConfig.dbName,
        };
      },
      inject: [DatabaseConfigService],
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
