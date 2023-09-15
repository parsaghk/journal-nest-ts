import { RoleEnum } from '@models/users/enums';
import { AbstractFilterDto } from '@shared/dto';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterUsersDto extends AbstractFilterDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(RoleEnum, { each: true })
  public readonly roleList?: RoleEnum[];
}
