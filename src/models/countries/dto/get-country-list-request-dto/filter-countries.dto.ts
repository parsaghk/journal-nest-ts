import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractFilterDto } from '@shared/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterCountriesDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ name: 'filters[name]' })
  public readonly name?: string;
}
