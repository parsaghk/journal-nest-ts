import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  public constructor(private readonly _configService: ConfigService) {}

  public get host(): string {
    return this._configService.get<string>('database.host') as string;
  }

  public get user(): string {
    return this._configService.get<string>('database.user') as string;
  }

  public get port(): number {
    return this._configService.get<number>('database.port') as number;
  }

  public get password(): string {
    return this._configService.get<string>('database.password') as string;
  }

  public get dbName(): string {
    return this._configService.get<string>('database.dbName') as string;
  }
}
