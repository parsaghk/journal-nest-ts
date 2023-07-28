import { MikroOrmHelper } from '@common/helpers';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityListResponseDto, PageMetaDto, PaginationDto } from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { FilterCitiesDto, GetCityListResponseDto, SortCitiesDto } from './dto';
import { City } from './entities';

@Injectable()
export class CitiesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleCity(articleId: EntityId) {
    const city = await this._entityManager.findOne(City, {
      id: articleId,
    });
    if (!city)
      throw new NotFoundException(
        this._i18n.translate('city.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return city;
  }

  public async getCityListAndCount(
    pagination: PaginationDto,
    filters: FilterCitiesDto,
    sorts: SortCitiesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [CityList, CityListCount] =
      await this._entityManager.findAndCount<City>(
        City,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, CityListCount);
    return new EntityListResponseDto<GetCityListResponseDto>(
      CityList,
      pageMetaDto,
    );
  }
}
