import { JwtPayload } from '@auth/types';
import { AuthConfigService } from '@config/auth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  public constructor(private readonly _authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _authConfigService.accessTokenSecret,
    });
  }

  public validate(payload: JwtPayload) {
    return payload;
  }
}
