import { MikroOrmHelper } from '@common/helpers';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityListResponseDto, PageMetaDto, PaginationDto } from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  FilterCountriesDto,
  GetCountryListResponseDto,
  SortCountriesDto,
} from './dto';
import { Country } from './entities';

@Injectable()
export class CountriesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleCountry(articleId: EntityId) {
    const country = await this._entityManager.findOne(Country, {
      id: articleId,
    });
    if (!country)
      throw new NotFoundException(
        this._i18n.translate('country.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return country;
  }

  public async getCountryListAndCount(
    pagination: PaginationDto,
    filters: FilterCountriesDto,
    sorts: SortCountriesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [CountryList, CountryListCount] =
      await this._entityManager.findAndCount<Country>(
        Country,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, CountryListCount);
    return new EntityListResponseDto<GetCountryListResponseDto>(
      CountryList,
      pageMetaDto,
    );
  }
}
