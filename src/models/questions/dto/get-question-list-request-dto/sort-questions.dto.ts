import { AbstractSortDto } from '@shared/dto';
import { SortEnum } from '@shared/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class SortQuestionsDto extends AbstractSortDto {
  @IsOptional()
  @IsEnum(SortEnum)
  public readonly content?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  public readonly type?: SortEnum;
}
