import { AbstractFilterDto } from '@shared/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterCountriesDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;
}
