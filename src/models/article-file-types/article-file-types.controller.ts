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
import { ArticleFileTypesService } from './article-file-types.service';
import {
  CreateArticleFileTypeRequestDto,
  GetArticleFileTypeListRequestDto,
  GetArticleFileTypeListResponseDto,
  GetSingleArticleFileTypeResponseDto,
  UpdateArticleFileTypeRequestDto,
} from './dto';
@ApiTags('Article Types')
@Controller('article-file-types')
export class ArticleFileTypesController {
  public constructor(
    private readonly _articleFileTypesService: ArticleFileTypesService,
  ) {}

  @Get('/all')
  @Serialize(GetArticleFileTypeListResponseDto)
  public getAllArticleFileTypeList() {
    return this._articleFileTypesService.getAllArticleFileTypeList();
  }

  @Get('/:articleId')
  @Serialize(GetSingleArticleFileTypeResponseDto)
  public getSingleArticleFileType(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._articleFileTypesService.getSingleArticleFileType(articleId);
  }

  @Get('/')
  @Serialize(GetArticleFileTypeListResponseDto)
  public getArticleFileTypeListAndCount(
    @Query() { pagination, sorts, filters }: GetArticleFileTypeListRequestDto,
  ) {
    return this._articleFileTypesService.getArticleFileTypeListAndCount(
      pagination,
      filters,
      sorts,
    );
  }

  @Post()
  @Serialize(GeneralResponseDto)
  public createArticleFileType(
    @Body() inputs: CreateArticleFileTypeRequestDto,
  ) {
    return this._articleFileTypesService.createArticleFileType(inputs);
  }

  @Put('/:articleId')
  @Serialize(GeneralResponseDto)
  public updateArticleFileType(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: UpdateArticleFileTypeRequestDto,
  ) {
    return this._articleFileTypesService.updateArticleFileType(
      articleId,
      inputs,
    );
  }
}
