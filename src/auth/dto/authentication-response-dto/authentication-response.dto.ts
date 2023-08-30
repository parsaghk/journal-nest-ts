import { Expose, Type } from 'class-transformer';
import { TokensDto } from './tokens.dto';
import { UserSummaryInfoDto } from './user-summary-info.dto';
export class AuthenticationResponseDto {
  @Expose()
  @Type(() => UserSummaryInfoDto)
  public readonly user: UserSummaryInfoDto;

  @Expose()
  @Type(() => TokensDto)
  public readonly tokens: TokensDto;
}
