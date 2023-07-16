import { Expose } from 'class-transformer';

export class GeneralResponseDto {
  @Expose()
  public readonly isSuccess: boolean;

  @Expose()
  public readonly message: string;
}
