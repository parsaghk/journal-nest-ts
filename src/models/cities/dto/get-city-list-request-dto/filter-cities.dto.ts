import { FilterStatesDto } from '@models/states';
import { AbstractFilterDto } from '@shared/dto';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilterCitiesDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterStatesDto)
  public readonly state?: FilterStatesDto;
}
