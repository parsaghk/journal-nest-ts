import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  public readonly title: string;
}
