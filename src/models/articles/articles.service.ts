import { MikroOrmHelper } from '@common/helpers';
import { wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { ArticleCategory } from '@models/article-categories';
import { ArticleType } from '@models/article-types';
import { FilterCitiesDto } from '@models/cities';
import { Question, QuestionTypeEnum } from '@models/questions';
import { Storage } from '@models/storage';
import { User } from '@models/users';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import {
  EntityListResponseDto,
  GeneralResponseDto,
  PageMetaDto,
  PaginationDto,
} from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nService } from 'nestjs-i18n';
import {
  CreateArticleRequestDto,
  GetArticleListResponseDto,
  SortArticlesDto,
  UpdateArticleRequestDto,
} from './dto';
import { Article, ArticleQuestion } from './entities';

@Injectable()
export class ArticlesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleArticleById(articleId: EntityId) {
    const article = await this._entityManager.findOne(
      Article,
      {
        id: articleId,
      },
      {
        populate: ['owner', 'type', 'category'],
      },
    );
    if (!article) throw new NotFoundException();
    return article;
  }

  public async getArticleList(
    pagination: PaginationDto,
    filters: FilterCitiesDto,
    sorts: SortArticlesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [articleList, articleListCount] =
      await this._entityManager.findAndCount<Article>(
        Article,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, articleListCount);
    return new EntityListResponseDto<GetArticleListResponseDto>(
      articleList,
      pageMetaDto,
    );
  }

  public async createArticle(
    inputs: CreateArticleRequestDto,
    userId: EntityId,
  ): Promise<GeneralResponseDto> {
    const articleCategory = await this._entityManager.findOne(ArticleCategory, {
      id: inputs.articleCategoryId,
    });
    if (!articleCategory) {
      throw new BadRequestException();
    }
    const articleType = await this._entityManager.findOne(ArticleType, {
      id: inputs.articleTypeId,
    });
    if (!articleType) {
      throw new BadRequestException();
    }
    const storageList = await this._entityManager.find(Storage, {
      id: { $in: inputs.fileIdList },
    });
    if (storageList.length !== inputs.fileIdList.length)
      throw new BadRequestException('files not found');

    const questionListOfSubmittingArticle = await this._entityManager.find(
      Question,
      {
        id: {
          $in: inputs.articleQuestionList.map(
            (articleQuestion) => articleQuestion.questionId,
          ),
        },
        type: QuestionTypeEnum.SUBMITTING_ARTICLE,
      },
    );
    if (
      questionListOfSubmittingArticle.length !==
      inputs.articleQuestionList.length
    ) {
      throw new BadRequestException('please answer all the questions');
    }
    const articleQuestionList = inputs.articleQuestionList.map(
      (articleQuestionRequestDto) => {
        const articleQuestion = new ArticleQuestion(
          articleQuestionRequestDto.reply,
        );
        const question = questionListOfSubmittingArticle.find(
          (question) => question.id === articleQuestionRequestDto.questionId,
        );
        wrap(articleQuestion).assign({ question });
        return articleQuestion;
      },
    );
    const owner = await this._entityManager.findOneOrFail(User, {
      id: userId,
    });
    const article = new Article(
      articleType,
      articleCategory,
      inputs.title,
      inputs.abstract,
      inputs.keywordList,
      owner,
    );
    wrap(article).assign({
      fileList: storageList,
      articleQuestionList: articleQuestionList,
    });
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: 'Article created successfully',
    };
  }

  public async updateArticle(
    articleId: EntityId,
    inputs: UpdateArticleRequestDto,
    userId: EntityId,
  ) {
    const article = await this._entityManager.findOne(Article, {
      id: articleId,
      owner: { id: userId },
    });
    const articleCategory = await this._entityManager.findOne(ArticleCategory, {
      id: inputs.articleCategoryId,
    });
    if (!articleCategory) {
      throw new BadRequestException();
    }
    const articleType = await this._entityManager.findOne(ArticleType, {
      id: inputs.articleTypeId,
    });
    if (!articleType) {
      throw new BadRequestException();
    }
    const storageList = await this._entityManager.find(Storage, {
      id: { $in: inputs.fileIdList },
    });
    if (storageList.length !== inputs.fileIdList.length)
      throw new BadRequestException('files not found');

    wrap(article).assign({
      ...inputs,
      type: articleType,
      category: articleCategory,
      fileList: storageList,
    });
  }
}
