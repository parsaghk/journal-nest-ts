import { MikroOrmHelper } from '@common/helpers';
import { wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { ArticleCategory } from '@models/article-categories';
import { ArticleFileType } from '@models/article-file-types';
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
  ProcessArticleRequestDto,
  SortArticlesDto,
  UpdateArticleRequestDto,
} from './dto';
import {
  Article,
  ArticleFile,
  ArticleQuestion,
  ArticleStatusHistory,
} from './entities';
import { ArticleStatusEnum } from './enums';

@Injectable()
export class ArticlesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async processArticle(
    articleId: EntityId,
    inputs: ProcessArticleRequestDto,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(Article, {
      id: articleId,
    });
    const juror = await this._entityManager.findOneOrFail(User, {
      id: inputs.jurorId,
    });
    const editor = await this._entityManager.findOneOrFail(User, {
      id: inputs.editorId,
    });
    const articleHistory = new ArticleStatusHistory(ArticleStatusEnum.JUDGING);
    wrap(article).assign({
      status: ArticleStatusEnum.JUDGING,
      juror: juror,
      editor: editor,
      statusHistory: [...article.statusHistory, articleHistory],
    });
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: 'Article processed successfully',
    };
  }

  public async getSingleArticleById(articleId: EntityId) {
    const article = await this._entityManager.findOne(
      Article,
      {
        id: articleId,
      },
      {
        populate: [
          'owner',
          'type',
          'category',
          'fileCollection.type',
          'fileCollection.storage',
          'questionCollection.question',
        ],
      },
    );
    if (!article) throw new NotFoundException();
    console.log(article.questionList);
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
      id: { $in: inputs.fileList.map((file) => file.storageId) },
    });
    if (storageList.length !== inputs.fileList.length)
      throw new BadRequestException('files not found');

    const articleFileTypeList = await this._entityManager.find(
      ArticleFileType,
      {
        id: { $in: inputs.fileList.map((file) => file.typeId) },
      },
    );
    if (articleFileTypeList.length !== inputs.fileList.length)
      throw new BadRequestException('article file types not found');

    const questionListOfSubmittingArticle = await this._entityManager.find(
      Question,
      {
        id: {
          $in: inputs.questionList.map(
            (articleQuestion) => articleQuestion.questionId,
          ),
        },
        type: QuestionTypeEnum.SUBMITTING_ARTICLE,
      },
    );
    if (questionListOfSubmittingArticle.length !== inputs.questionList.length) {
      throw new BadRequestException('please answer all the questions');
    }
    const articleQuestionList = inputs.questionList.map(
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
    const article = new Article({
      type: articleType,
      category: articleCategory,
      subject: inputs.subject,
      shortDescription: inputs.shortDescription,
      title: inputs.title,
      abstract: inputs.abstract,
      keywordList: inputs.keywordList,
      owner,
    });
    wrap(article).assign({
      fileCollection: inputs.fileList.map((file) => {
        const storage = storageList.find(
          (storage) => storage.id === file.storageId,
        );
        const articleFileType = articleFileTypeList.find(
          (articleFileType) => articleFileType.id === file.typeId,
        );
        const articleFile = new ArticleFile(file.description);
        wrap(articleFile).assign({
          type: articleFileType,
          storage: storage,
        });
        return articleFile;
      }),
      questionCollection: articleQuestionList,
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
    const article = await this._entityManager.findOneOrFail(Article, {
      id: articleId,
      owner: { id: userId },
    });
    const articleCategory = await this._entityManager.findOneOrFail(
      ArticleCategory,
      {
        id: inputs.articleCategoryId,
      },
    );
    const articleType = await this._entityManager.findOneOrFail(ArticleType, {
      id: inputs.articleTypeId,
    });
    // const storageList = await this._entityManager.find(Storage, {
    //   id: { $in: inputs.fileIdList },
    // });
    // if (storageList.length !== inputs.fileIdList.length)
    //   throw new BadRequestException('files not found');

    wrap(article).assign({
      ...inputs,
      type: articleType,
      category: articleCategory,
      // fileList: storageList,
    });
  }
}
