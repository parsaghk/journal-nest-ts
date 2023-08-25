import { MikroOrmHelper } from '@common/helpers';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityListResponseDto, PageMetaDto, PaginationDto } from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { FilterStatesDto, GetStateListResponseDto, SortStatesDto } from './dto';
import { State } from './entities';

@Injectable()
export class StatesService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleState(articleId: EntityId) {
    const state = await this._entityManager.findOne(State, {
      id: articleId,
    });
    if (!state)
      throw new NotFoundException(
        this._i18n.translate('state.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return state;
  }

  public getStateListOfCountry(countryId: EntityId) {
    return this._entityManager.find(State, { country: { id: countryId } });
  }

  public async getStateListAndCount(
    pagination: PaginationDto,
    filters: FilterStatesDto,
    sorts: SortStatesDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [StateList, StateListCount] =
      await this._entityManager.findAndCount<State>(
        State,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, StateListCount);
    return new EntityListResponseDto<GetStateListResponseDto>(
      StateList,
      pageMetaDto,
    );
  }
}
