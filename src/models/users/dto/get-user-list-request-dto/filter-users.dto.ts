import { AbstractFilterDto } from '@shared/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterUsersDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;
}
