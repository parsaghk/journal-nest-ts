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
  GetArticleListResponseDto,
  GetSingleArticleResponseDto,
  ProcessArticleRequestDto,
  ReviewRejectionRequestDto,
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

  @Get('/')
  @Serialize(GetArticleListResponseDto)
  public getArticleList(
    @Query() { filters, pagination, sorts }: getArticleListRequestDto,
  ) {
    return this._articlesService.getArticleList(pagination, filters, sorts);
  }

  @Post('/')
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

  @Post(':articleId/process')
  @UseGuards(AccessTokenGuard)
  public processArticle(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: ProcessArticleRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.processArticle(articleId, inputs, user.sub);
  }

  @Post(':articleId/publish')
  @UseGuards(AccessTokenGuard)
  public publishArticle(
    @Param('articleId') articleId: EntityId,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.publishArticle(articleId, user.sub);
  }

  @Post(':articleId/jurors/reject')
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public rejectArticleByJuror(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: ReviewRejectionRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.rejectArticleByJuror(
      articleId,
      inputs,
      user.sub,
    );
  }

  @Post(':articleId/jurors/accept')
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public acceptArticleByJuror(
    @Param('articleId') articleId: EntityId,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.acceptArticleByJuror(articleId, user.sub);
  }

  @Post(':articleId/editors/reject')
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public rejectArticleByEditor(
    @Param('articleId') articleId: EntityId,
    @Body() inputs: ReviewRejectionRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.rejectArticleByEditor(
      articleId,
      inputs,
      user.sub,
    );
  }

  @Post(':articleId/editors/accept')
  @UseGuards(AccessTokenGuard)
  @Serialize(GeneralResponseDto)
  public acceptArticleByEditor(
    @Param('articleId') articleId: EntityId,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._articlesService.acceptArticleByEditor(articleId, user.sub);
  }
}
