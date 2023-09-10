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
import { ArticleCategoriesService } from './article-categories.service';
import {
  CreateArticleCategoryRequestDto,
  GetArticleCategoryListRequestDto,
  GetArticleCategoryListResponseDto,
  GetSingleArticleCategoryResponseDto,
  UpdateArticleCategoryRequestDto,
} from './dto';
@ApiTags('Article Categories')
@Controller('article-categories')
export class ArticleCategoriesController {
  public constructor(
    private readonly _articleCategoriesService: ArticleCategoriesService,
  ) {}

  @Get('/all')
  @Serialize(GetArticleCategoryListResponseDto)
  public getAllArticleCategoryList() {
    return this._articleCategoriesService.getAllArticleCategoryList();
  }

  @Get('/:articleId')
  @Serialize(GetSingleArticleCategoryResponseDto)
  public getSingleArticleCategory(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._articleCategoriesService.getSingleArticleCategory(articleId);
  }

  @Get('/')
  @Serialize(GetArticleCategoryListResponseDto)
  public getArticleCategoryListAndCount(
    @Query() { pagination, sorts, filters }: GetArticleCategoryListRequestDto,
  ) {
    return this._articleCategoriesService.getArticleCategoryListAndCount(
      pagination,
      filters,
      sorts,
    );
  }

  @Post()
  @Serialize(GeneralResponseDto)
  public createArticleCategory(
    @Body() inputs: CreateArticleCategoryRequestDto,
  ) {
    return this._articleCategoriesService.createArticleCategory(inputs);
  }

  @Put('/:articleId')
  @Serialize(GeneralResponseDto)
  public updateArticleCategory(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: UpdateArticleCategoryRequestDto,
  ) {
    return this._articleCategoriesService.updateArticleCategory(
      articleId,
      inputs,
    );
  }
}
