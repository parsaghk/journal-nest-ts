import { AbstractFilterDto } from '@shared/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterArticleFileTypesDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly title?: string;
}
