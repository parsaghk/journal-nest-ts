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
  CreateArticleTypeRequestDto,
  FilterArticleTypesDto,
  GetArticleTypeListResponseDto,
  SortArticleTypesDto,
  UpdateArticleTypeRequestDto,
} from './dto';
import { ArticleType } from './entities';

@Injectable()
export class ArticleTypesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleArticleType(articleId: EntityId) {
    const articleType = await this._entityManager.findOne(ArticleType, {
      id: articleId,
    });
    if (!articleType)
      throw new NotFoundException(
        this._i18n.translate('articleType.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return articleType;
  }

  public getAllArticleTypeList() {
    return this._entityManager.find(ArticleType, {});
  }

  public async getArticleTypeListAndCount(
    pagination: PaginationDto,
    filters: FilterArticleTypesDto,
    sorts: SortArticleTypesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [articleTypeList, articleTypeListCount] =
      await this._entityManager.findAndCount<ArticleType>(
        ArticleType,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, articleTypeListCount);
    return new EntityListResponseDto<GetArticleTypeListResponseDto>(
      articleTypeList,
      pageMetaDto,
    );
  }

  public async createArticleType(
    inputs: CreateArticleTypeRequestDto,
  ): Promise<GeneralResponseDto> {
    const articleTypeWithDuplicateTitle = await this._entityManager.findOne(
      ArticleType,
      {
        title: inputs.title,
      },
    );
    if (articleTypeWithDuplicateTitle)
      throw new BadRequestException(
        this._i18n.translate('articleType.duplicate-title', {
          lang: I18nContext.current()?.lang,
        }),
      );
    const articleType = new ArticleType(inputs.title);
    await this._entityManager.persistAndFlush(articleType);
    return {
      isSuccess: true,
      message: this._i18n.translate('articleType.create', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  public async updateArticleType(
    articleTypeId: EntityId,
    inputs: UpdateArticleTypeRequestDto,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(ArticleType, {
      id: articleTypeId,
    });
    wrap(article).assign(inputs);
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: this._i18n.t('articleType.update', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
