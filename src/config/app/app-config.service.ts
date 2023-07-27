import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvEnum } from '@shared/enums';

@Injectable()
export class AppConfigService {
  public constructor(private readonly _configService: ConfigService) {}

  public get env(): AppEnvEnum {
    return this._configService.get<AppEnvEnum>('app.env') as AppEnvEnum;
  }

  public get rootPath(): string {
    return process.cwd();
  }

  public get port(): number {
    return this._configService.get<number>('app.port') as number;
  }

  public get url(): string {
    return this._configService.get<string>('app.url') as string;
  }
}
