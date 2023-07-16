import { DateRangeFilterDto } from '@shared/dto';
import { EntityId } from '@shared/types';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';

export class AbstractFilterDto {
  @IsOptional()
  @IsUUID('4')
  public readonly id?: EntityId;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeFilterDto)
  public readonly createdAt?: DateRangeFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeFilterDto)
  public readonly updatedAt?: DateRangeFilterDto;
}
