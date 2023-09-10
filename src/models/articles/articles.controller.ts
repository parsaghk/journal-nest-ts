import { JwtPayload } from '@auth/types';
import { CurrentUser, Serialize } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralResponseDto } from '@shared/dto';
import { EntityId } from '@shared/types';
import { ArticlesService } from './articles.service';
import {
  CreateArticleRequestDto,
  getArticleListRequestDto,
  GetSingleArticleResponseDto,
  UpdateArticleRequestDto,
} from './dto';

@ApiTags('Articles')
@Controller('/articles')
export class ArticlesController {
  public constructor(private readonly _articlesService: ArticlesService) {}

  @Get('/:articleId')
  @Serialize(GetSingleArticleResponseDto)
  public getSingleArticleById(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._articlesService.getSingleArticleById(articleId);
  }

  @Get()
  public getArticleList(
    @Query() { filters, pagination, sorts }: getArticleListRequestDto,
  ) {
    return this._articlesService.getArticleList(pagination, filters, sorts);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public createArticle(
    @Body() inputs: CreateArticleRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.createArticle(inputs, user.sub);
  }

  @Put('/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public updateArticle(
    @Param() articleId: EntityId,
    @Body() inputs: UpdateArticleRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.updateArticle(articleId, inputs, user.sub);
  }
}
