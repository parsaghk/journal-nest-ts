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
import { GeneralResponseDto } from '@shared/dto';
import { EntityId } from '@shared/types';
import { ArticleTypesService } from './article-types.service';
import {
  CreateArticleTypeRequestDto,
  GetArticleTypeListRequestDto,
  GetArticleTypeListResponseDto,
  GetSingleArticleTypeResponseDto,
  UpdateArticleTypeRequestDto,
} from './dto';
@Controller('admin/article-types')
export class ArticleTypesController {
  public constructor(
    private readonly _articleTypesService: ArticleTypesService,
  ) {}

  @Get('/:articleId')
  @Serialize(GetSingleArticleTypeResponseDto)
  public getSingleArticleType(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._articleTypesService.getSingleArticleType(articleId);
  }

  @Get('/')
  @Serialize(GetArticleTypeListResponseDto)
  public getArticleTypeListAndCount(
    @Query() { pagination, sorts, filters }: GetArticleTypeListRequestDto,
  ) {
    return this._articleTypesService.getArticleTypeListAndCount(
      pagination,
      filters,
      sorts,
    );
  }

  @Post()
  @Serialize(GeneralResponseDto)
  public createArticleType(@Body() inputs: CreateArticleTypeRequestDto) {
    return this._articleTypesService.createArticleType(inputs);
  }

  @Put('/:articleId')
  @Serialize(GeneralResponseDto)
  public updateArticleType(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: UpdateArticleTypeRequestDto,
  ) {
    return this._articleTypesService.updateArticleType(articleId, inputs);
  }
}
