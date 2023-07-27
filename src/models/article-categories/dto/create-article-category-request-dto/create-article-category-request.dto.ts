import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleCategoryRequestDto {
  @IsNotEmpty()
  @IsString()
  public readonly title: string;
}
