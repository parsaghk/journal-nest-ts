import { CurrentUser, Serialize } from '@common/decorators';
import { RefreshTokenGuard } from '@common/guards';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GeneralResponseDto } from '@shared/dto';
import { AuthService } from './auth.service';
import {
  AuthenticationResponseDto,
  LoginRequestDto,
  LogoutRequestDto,
  RegisterRequestDto,
} from './dto';
import { JwtPayload } from './types';

@Controller('auth')
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

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
