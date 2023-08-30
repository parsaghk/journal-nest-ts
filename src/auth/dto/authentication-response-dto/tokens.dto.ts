import { Expose } from 'class-transformer';

export class TokensDto {
  @Expose()
  public readonly accessToken: string;

  @Expose()
  public readonly refreshToken: string;
}
