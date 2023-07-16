import { JwtPayload } from '@auth/types';
import { AuthConfigService } from '@config/auth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  public constructor(private readonly _authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _authConfigService.refreshTokenSecret,
    });
  }

  public validate(payload: JwtPayload) {
    return payload;
  }
}
