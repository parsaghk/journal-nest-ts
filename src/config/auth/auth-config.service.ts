import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  public constructor(private readonly _configService: NestConfigService) {}

  public get accessTokenSecret(): string {
    return this._configService.get<string>('auth.accessTokenSecret') as string;
  }

  public get accessTokenExpiresIn(): string {
    return this._configService.get<string>(
      'auth.accessTokenExpiresIn',
    ) as string;
  }

  public get refreshTokenSecret(): string {
    return this._configService.get<string>('auth.refreshTokenSecret') as string;
  }

  public get refreshTokenExpiresIn(): string {
    return this._configService.get<string>(
      'auth.refreshTokenExpiresIn',
    ) as string;
  }
}
