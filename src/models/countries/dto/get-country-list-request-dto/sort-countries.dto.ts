import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractSortDto } from '@shared/dto';
import { SortEnum } from '@shared/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class SortCountriesDto extends AbstractSortDto {
  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ enum: SortEnum, name: 'sorts[name]' })
  public readonly name?: SortEnum;
}
