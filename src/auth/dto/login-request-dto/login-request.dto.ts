import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
