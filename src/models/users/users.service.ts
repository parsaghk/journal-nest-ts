import { MikroOrmHelper } from '@common/helpers';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityListResponseDto, PageMetaDto, PaginationDto } from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { FilterUsersDto, GetUserListResponseDto, SortUsersDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleUser(articleId: EntityId) {
    const user = await this._entityManager.findOne(User, {
      id: articleId,
    });
    if (!user)
      throw new NotFoundException(
        this._i18n.translate('user.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return user;
  }

  public async getUserListAndCount(
    pagination: PaginationDto,
    filters: FilterUsersDto,
    sorts: SortUsersDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [UserList, UserListCount] =
      await this._entityManager.findAndCount<User>(
        User,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, UserListCount);
    return new EntityListResponseDto<GetUserListResponseDto>(
      UserList,
      pageMetaDto,
    );
  }
}
