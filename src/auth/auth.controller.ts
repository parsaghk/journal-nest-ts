import { RegisterRequestDto } from '@auth/dto/register-request-dto/register-request.dto';
import { Serialize } from '@common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationResponseDto, LoginRequestDto } from './dto';

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

  @Post('/register')
  @Serialize(AuthenticationResponseDto)
  public register(@Body() inputs: RegisterRequestDto) {
    return this._authService.register(inputs);
  }
}
