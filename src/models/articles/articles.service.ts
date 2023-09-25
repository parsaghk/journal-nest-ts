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
import { RoleEnum, User } from '@models/users';
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
  ReviewRejectionRequestDto,
  SortArticlesDto,
  UpdateArticleRequestDto,
} from './dto';
import {
  Article,
  ArticleFile,
  ArticleQuestion,
  ArticleReviewerComment,
  ArticleStatusHistory,
} from './entities';
import { ArticleCommentTypeEnum, ArticleStatusEnum } from './enums';

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
    managerId: EntityId,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(Article, {
      id: articleId,
    });
    const manager = await this._entityManager.findOneOrFail(User, {
      id: managerId,
    });
    const juror = await this._entityManager.findOneOrFail(User, {
      id: inputs.jurorId,
      roleList: { $contains: [RoleEnum.JUROR] },
    });
    const editor = await this._entityManager.findOneOrFail(User, {
      id: inputs.editorId,
      roleList: { $contains: [RoleEnum.EDITOR] },
    });
    const articleHistory = new ArticleStatusHistory(
      ArticleStatusEnum.JUDGING,
      RoleEnum.MANAGER,
    );
    wrap(articleHistory).assign({
      affectedBy: manager,
    });
    wrap(article).assign({
      status: ArticleStatusEnum.JUDGING,
      juror: juror,
      editor: editor,
      statusHistoryCollection: [...article.statusHistoryList, articleHistory],
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
          'statusHistoryCollection.affectedBy',
          'reviewerCommentCollection',
        ],
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
          fields: [
            'id',
            'createdAt',
            'updatedAt',
            'status',
            'owner',
            'subject',
            'shortDescription',
          ],
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

  public async publishArticle(
    articleId: EntityId,
    managerId: EntityId,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(Article, {
      id: articleId,
      status: ArticleStatusEnum.FINALIZING,
    });
    const manager = await this._entityManager.findOneOrFail(User, {
      id: managerId,
    });
    const articleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.PUBLISHED,
      RoleEnum.MANAGER,
    );
    wrap(articleStatusHistory).assign({
      affectedBy: manager,
    });
    wrap(article).assign({
      status: ArticleStatusEnum.PUBLISHED,
    });
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: 'Article published successfully',
    };
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
    const articleFileTypeSet = new Set(
      inputs.fileList.map((file) => file.typeId),
    );
    if (articleFileTypeList.length !== articleFileTypeSet.size)
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
    const articleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.PROCESSING,
      RoleEnum.USER,
    );
    wrap(articleStatusHistory).assign({
      affectedBy: owner,
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
      statusHistoryCollection: [articleStatusHistory],
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

  public async rejectArticleByJuror(
    articleId: EntityId,
    inputs: ReviewRejectionRequestDto,
    jurorId: EntityId,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(
      Article,
      {
        id: articleId,
        status: ArticleStatusEnum.JUDGING,
        juror: { id: jurorId },
      },
      {
        populate: ['statusHistoryCollection', 'reviewerCommentCollection'],
      },
    );
    const juror = await this._entityManager.findOneOrFail(User, {
      id: jurorId,
    });
    const newArticleReviewComment = new ArticleReviewerComment(
      inputs.comment,
      ArticleCommentTypeEnum.JUDGING,
    );
    const newArticleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.REJECTED,
      RoleEnum.JUROR,
    );
    wrap(newArticleStatusHistory).assign({ affectedBy: juror });
    wrap(article).assign({
      status: ArticleStatusEnum.REJECTED,
      reviewerCommentCollection: [
        ...article.reviewerCommentList,
        newArticleReviewComment,
      ],
      statusHistoryCollection: [
        ...article.statusHistoryList,
        newArticleStatusHistory,
      ],
    });
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: 'Article processed successfully',
    };
  }

  public async acceptArticleByJuror(
    articleId: EntityId,
    jurorId: EntityId,
  ): Promise<GeneralResponseDto> {
    console.log(jurorId);
    const article = await this._entityManager.findOneOrFail(
      Article,
      {
        id: articleId,
        status: ArticleStatusEnum.JUDGING,
        juror: { id: jurorId },
      },
      {
        populate: ['statusHistoryCollection', 'reviewerCommentCollection'],
      },
    );
    const newArticleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.EDITING,
      RoleEnum.JUROR,
    );
    const juror = await this._entityManager.findOneOrFail(User, {
      id: jurorId,
    });
    wrap(newArticleStatusHistory).assign({ affectedBy: juror });
    wrap(article).assign({
      status: ArticleStatusEnum.EDITING,
      statusHistoryCollection: [
        ...article.statusHistoryList,
        newArticleStatusHistory,
      ],
    });
    await this._entityManager.persist(article);
    return {
      isSuccess: true,
      message: 'Article accepted by juror successfully',
    };
  }

  public async rejectArticleByEditor(
    articleId: EntityId,
    inputs: ReviewRejectionRequestDto,
    editorId: EntityId,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(
      Article,
      {
        id: articleId,
        status: ArticleStatusEnum.EDITING,
        editor: { id: editorId },
      },
      {
        populate: ['statusHistoryCollection', 'reviewerCommentCollection'],
      },
    );
    const editor = await this._entityManager.findOneOrFail(User, {
      id: editorId,
    });
    const newArticleReviewComment = new ArticleReviewerComment(
      inputs.comment,
      ArticleCommentTypeEnum.EDITING,
    );
    const newArticleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.REJECTED,
      RoleEnum.JUROR,
    );
    wrap(newArticleStatusHistory).assign({ affectedBy: editor });
    wrap(article).assign({
      status: ArticleStatusEnum.REJECTED,
      reviewerCommentCollection: [
        ...article.reviewerCommentList,
        newArticleReviewComment,
      ],
      statusHistoryCollection: [
        ...article.statusHistoryList,
        newArticleStatusHistory,
      ],
    });
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: 'Article processed successfully',
    };
  }

  public async acceptArticleByEditor(
    articleId: EntityId,
    editorId: EntityId,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(
      Article,
      {
        id: articleId,
        status: ArticleStatusEnum.EDITING,
        editor: { id: editorId },
      },
      {
        populate: ['statusHistoryCollection', 'reviewerCommentCollection'],
      },
    );
    const newArticleStatusHistory = new ArticleStatusHistory(
      ArticleStatusEnum.EDITING,
      RoleEnum.EDITOR,
    );
    const editor = await this._entityManager.findOneOrFail(User, {
      id: editorId,
    });
    wrap(newArticleStatusHistory).assign({ affectedBy: editor });
    wrap(article).assign({
      status: ArticleStatusEnum.FINALIZING,
      statusHistoryCollection: [
        ...article.statusHistoryList,
        newArticleStatusHistory,
      ],
    });
    await this._entityManager.persist(article);
    return {
      isSuccess: true,
      message: 'Article accepted by editor successfully',
    };
  }
}
