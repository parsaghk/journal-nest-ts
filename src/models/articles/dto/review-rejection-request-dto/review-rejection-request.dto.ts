import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewRejectionRequestDto {
  @IsString()
  @IsNotEmpty()
  public readonly comment: string;
}
