import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleFileTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  public readonly title: string;
}
