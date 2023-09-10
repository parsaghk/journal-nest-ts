import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import {
  FilterQuestionsDto,
  SortQuestionsDto,
} from '../get-question-list-request-dto';

export class GetAllQuestionListRequestDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterQuestionsDto)
  public readonly filters = new FilterQuestionsDto();

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortQuestionsDto)
  public readonly sorts: SortQuestionsDto = new SortQuestionsDto();
}
