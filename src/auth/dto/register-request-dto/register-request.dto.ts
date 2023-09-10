import { ApiProperty } from '@nestjs/swagger';
import { EntityId } from '@shared/types';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public middleName?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public username: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  public password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public position?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public institution?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public department?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public address?: string;

  @IsUUID()
  @ApiProperty()
  public countryId: EntityId;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  public stateId?: EntityId;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  public cityId?: EntityId;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public postalCode?: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  public personalKeywordList: string[];
}
