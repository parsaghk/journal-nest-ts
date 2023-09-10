import { Serialize } from '@common/decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralResponseDto } from '@shared/dto';
import { EntityId } from '@shared/types';
import {
  CreateQuestionRequestDto,
  GetQuestionListRequestDto,
  GetQuestionListResponseDto,
  GetSingleQuestionResponseDto,
  UpdateQuestionRequestDto,
} from './dto';
import { QuestionsService } from './questions.service';
@ApiTags('Article Categories')
@Controller('questions')
export class QuestionsController {
  public constructor(private readonly _questionsService: QuestionsService) {}

  @Get('/all')
  @Serialize(GetQuestionListResponseDto)
  public getAllQuestionList() {
    return this._questionsService.getAllQuestionList();
  }

  @Get('/:questionId')
  @Serialize(GetSingleQuestionResponseDto)
  public getSingleQuestion(
    @Param('questionId', new ParseUUIDPipe()) questionId: EntityId,
  ) {
    return this._questionsService.getSingleQuestion(questionId);
  }

  @Get('/')
  @Serialize(GetQuestionListResponseDto)
  public getQuestionListAndCount(
    @Query() { pagination, sorts, filters }: GetQuestionListRequestDto,
  ) {
    return this._questionsService.getQuestionListAndCount(
      pagination,
      filters,
      sorts,
    );
  }

  @Post()
  @Serialize(GeneralResponseDto)
  public createQuestion(@Body() inputs: CreateQuestionRequestDto) {
    return this._questionsService.createQuestion(inputs);
  }

  @Put('/:questionId')
  @Serialize(GeneralResponseDto)
  public updateQuestion(
    @Param('questionId') questionId: EntityId,
    @Body() inputs: UpdateQuestionRequestDto,
  ) {
    return this._questionsService.updateQuestion(questionId, inputs);
  }
}
