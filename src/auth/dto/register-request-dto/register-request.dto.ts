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
  public firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public middleName?: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsOptional()
  @IsString()
  public position?: string;

  @IsOptional()
  @IsString()
  public institution?: string;

  @IsOptional()
  @IsString()
  public department?: string;

  @IsOptional()
  @IsString()
  public address?: string;

  @IsUUID()
  public countryId: EntityId;

  @IsOptional()
  @IsUUID()
  public stateId?: EntityId;

  @IsOptional()
  @IsUUID()
  public cityId?: EntityId;

  @IsOptional()
  @IsString()
  public postalCode?: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsNotEmpty()
  public personalKeywordList: string[];
}
