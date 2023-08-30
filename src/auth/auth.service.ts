import { GeneralHelper } from '@common/helpers';
import { AuthConfigService } from '@config/auth';
import { wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { City } from '@models/cities';
import { Country } from '@models/countries';
import { State } from '@models/states';
import { User } from '@models/users';
import { UserToken } from '@models/users/entities/user-token.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nService } from 'nestjs-i18n';
import { v4 } from 'uuid';
import {
  AuthenticationResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from './dto';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _authConfigService: AuthConfigService,
    private readonly _jwtService: JwtService,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async register(
    inputs: RegisterRequestDto,
  ): Promise<AuthenticationResponseDto> {
    const userWithSameUsername = await this._entityManager.findOne(User, {
      username: inputs.username,
    });
    if (userWithSameUsername) {
      throw new BadRequestException(this._i18n.t('user.username-exists'));
    }
    const city = await this._entityManager.findOne(City, {
      id: inputs.cityId,
    });
    const state = await this._entityManager.findOne(State, {
      id: inputs.stateId,
    });
    const country = await this._entityManager.findOneOrFail(Country, {
      id: inputs.countryId,
    });

    const hashedPassword = GeneralHelper.hashPassword(inputs.password);
    const user = new User();
    wrap(user).assign({
      ...inputs,
      city,
      state,
      country,
      password: hashedPassword,
    });
    const securityTimestamp = v4();
    const [accessToken, refreshToken] = await this._generateTokens(
      user.id,
      securityTimestamp,
    );
    const userToken = new UserToken(securityTimestamp, user);
    await this._entityManager.persistAndFlush([user, userToken]);
    return {
      user,
      tokens: { accessToken, refreshToken },
    };
  }

  public async login(
    inputs: LoginRequestDto,
  ): Promise<AuthenticationResponseDto> {
    const user = await this._entityManager.findOne(User, {
      username: inputs.username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!bcrypt.compareSync(inputs.password, user.password)) {
      throw new UnauthorizedException();
    }
    const securityTimestamp = v4();
    const [accessToken, refreshToken] = await this._generateTokens(
      user.id,
      securityTimestamp,
    );
    const userToken = new UserToken(securityTimestamp, user);
    await this._entityManager.persistAndFlush(userToken);
    return {
      user: user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  private _generateTokens(
    userId: EntityId,
    securityTimestamp: string,
  ): Promise<[string, string]> {
    return Promise.all([
      this._jwtService.sign(
        {
          sub: userId,
          securityTimestamp,
        },
        {
          secret: this._authConfigService.accessTokenSecret,
          expiresIn: this._authConfigService.accessTokenExpiresIn,
        },
      ),
      this._jwtService.sign(
        {
          sub: userId,
          securityTimestamp,
        },
        {
          secret: this._authConfigService.refreshTokenSecret,
          expiresIn: this._authConfigService.refreshTokenExpiresIn,
        },
      ),
    ]);
  }
}
