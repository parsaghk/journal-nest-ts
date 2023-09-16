import { Expose } from 'class-transformer';

export class UserSummaryInfoDto {
  @Expose()
  public readonly firstName: string;

  @Expose()
  public readonly lastName: string;

  @Expose()
  public readonly roleList: string[];
}
