import { FilterCountriesDto } from '@models/countries';
import { AbstractFilterDto } from '@shared/dto';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilterStatesDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterCountriesDto)
  public readonly country?: FilterCountriesDto;
}
