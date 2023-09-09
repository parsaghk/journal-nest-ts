import { MikroOrmHelper } from '@common/helpers';
import { wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
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
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  CreateArticleCategoryRequestDto,
  FilterArticleCategoriesDto,
  GetArticleCategoryListResponseDto,
  SortArticleCategoriesDto,
  UpdateArticleCategoryRequestDto,
} from './dto';
import { ArticleCategory } from './entities';

@Injectable()
export class ArticleCategoriesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleArticleCategory(articleId: EntityId) {
    const articleCategory = await this._entityManager.findOne(ArticleCategory, {
      id: articleId,
    });
    if (!articleCategory)
      throw new NotFoundException(
        this._i18n.translate('articleCategory.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return articleCategory;
  }

  public async getArticleCategoryListAndCount(
    pagination: PaginationDto,
    filters: FilterArticleCategoriesDto,
    sorts: SortArticleCategoriesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [articleCategoryList, articleCategoryListCount] =
      await this._entityManager.findAndCount<ArticleCategory>(
        ArticleCategory,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, articleCategoryListCount);
    return new EntityListResponseDto<GetArticleCategoryListResponseDto>(
      articleCategoryList,
      pageMetaDto,
    );
  }

  public getAllArticleCategoryList() {
    return this._entityManager.find(ArticleCategory, {});
  }

  public async createArticleCategory(
    inputs: CreateArticleCategoryRequestDto,
  ): Promise<GeneralResponseDto> {
    const articleCategoryWithDuplicateTitle = await this._entityManager.findOne(
      ArticleCategory,
      { title: inputs.title },
    );
    if (articleCategoryWithDuplicateTitle)
      throw new BadRequestException(
        this._i18n.translate('articleCategory.duplicate-title', {
          lang: I18nContext.current()?.lang,
        }),
      );
    const articleCategory = new ArticleCategory(inputs.title);
    await this._entityManager.persistAndFlush(articleCategory);
    return {
      isSuccess: true,
      message: this._i18n.translate('articleCategory.create', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  public async updateArticleCategory(
    articleCategoryId: EntityId,
    inputs: UpdateArticleCategoryRequestDto,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(ArticleCategory, {
      id: articleCategoryId,
    });
    wrap(article).assign(inputs);
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: this._i18n.t('articleCategory.update', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
