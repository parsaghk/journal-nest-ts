import { Expose } from 'class-transformer';

export class ArticleAuthorResponseDto {
  @Expose()
  public readonly firstName: string;

  @Expose()
  public readonly middleName?: string;

  @Expose()
  public readonly lastName: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly position?: string;

  @Expose()
  public readonly institution?: string;

  @Expose()
  public readonly department?: string;
}
