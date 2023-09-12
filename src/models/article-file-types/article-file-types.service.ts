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
  CreateArticleFileTypeRequestDto,
  FilterArticleFileTypesDto,
  GetArticleFileTypeListResponseDto,
  SortArticleFileTypesDto,
  UpdateArticleFileTypeRequestDto,
} from './dto';
import { ArticleFileType } from './entities';

@Injectable()
export class ArticleFileTypesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleArticleFileType(articleId: EntityId) {
    const articleFileType = await this._entityManager.findOne(ArticleFileType, {
      id: articleId,
    });
    if (!articleFileType)
      throw new NotFoundException(
        this._i18n.translate('articleFileType.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return articleFileType;
  }

  public getAllArticleFileTypeList() {
    return this._entityManager.find(ArticleFileType, {});
  }

  public async getArticleFileTypeListAndCount(
    pagination: PaginationDto,
    filters: FilterArticleFileTypesDto,
    sorts: SortArticleFileTypesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [articleFileTypeList, articleFileTypeListCount] =
      await this._entityManager.findAndCount<ArticleFileType>(
        ArticleFileType,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, articleFileTypeListCount);
    return new EntityListResponseDto<GetArticleFileTypeListResponseDto>(
      articleFileTypeList,
      pageMetaDto,
    );
  }

  public async createArticleFileType(
    inputs: CreateArticleFileTypeRequestDto,
  ): Promise<GeneralResponseDto> {
    const articleFileTypeWithDuplicateTitle = await this._entityManager.findOne(
      ArticleFileType,
      {
        title: inputs.title,
      },
    );
    if (articleFileTypeWithDuplicateTitle)
      throw new BadRequestException(
        this._i18n.translate('articleFileType.duplicate-title', {
          lang: I18nContext.current()?.lang,
        }),
      );
    const articleFileType = new ArticleFileType(inputs.title);
    await this._entityManager.persistAndFlush(articleFileType);
    return {
      isSuccess: true,
      message: this._i18n.translate('articleFileType.create', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  public async updateArticleFileType(
    articleFileTypeId: EntityId,
    inputs: UpdateArticleFileTypeRequestDto,
  ): Promise<GeneralResponseDto> {
    const article = await this._entityManager.findOneOrFail(ArticleFileType, {
      id: articleFileTypeId,
    });
    wrap(article).assign(inputs);
    await this._entityManager.persistAndFlush(article);
    return {
      isSuccess: true,
      message: this._i18n.t('articleFileType.update', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
