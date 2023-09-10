import { SortQuestionsDto } from '@models/questions';
import { PaginationDto } from '@shared/dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FilterQuestionsDto } from './filter-questions.dto';
export class GetQuestionListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterQuestionsDto)
  public readonly filters = new FilterQuestionsDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  public readonly pagination: PaginationDto = new PaginationDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortQuestionsDto)
  public readonly sorts: SortQuestionsDto = new SortQuestionsDto();
}
