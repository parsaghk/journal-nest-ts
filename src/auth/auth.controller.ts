import { CurrentUser, Serialize } from '@common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from '@common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralResponseDto } from '@shared/dto';
import { AuthService } from './auth.service';
import {
  AuthenticationResponseDto,
  LoginRequestDto,
  LogoutRequestDto,
  RegisterRequestDto,
  UserSummaryInfoDto,
} from './dto';
import { JwtPayload } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  @Get('/whoami')
  @UseGuards(AccessTokenGuard)
  @Serialize(UserSummaryInfoDto)
  public whoami(@CurrentUser() user: JwtPayload) {
    return this._authService.whoami(user.sub);
  }

  @Post('/login')
  @Serialize(AuthenticationResponseDto)
  public login(
    @Body() inputs: LoginRequestDto,
  ): Promise<AuthenticationResponseDto> {
    return this._authService.login(inputs);
  }

  @Post('/logout')
  @Serialize(GeneralResponseDto)
  @UseGuards(RefreshTokenGuard)
  public logout(
    @Body() inputs: LogoutRequestDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<GeneralResponseDto> {
    return this._authService.logout(inputs, user);
  }

  @Post('/register')
  @Serialize(AuthenticationResponseDto)
  public register(@Body() inputs: RegisterRequestDto) {
    return this._authService.register(inputs);
  }
}
