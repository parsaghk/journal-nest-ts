import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EntityId } from '@shared/types';
import {
  GetSingleUserResponseDto,
  GetUserListRequestDto,
  GetUserListResponseDto,
} from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get('/:articleId')
  @Serialize(GetSingleUserResponseDto)
  public getSingleUser(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._usersService.getSingleUser(articleId);
  }

  @Get('/')
  @Serialize(GetUserListResponseDto)
  public getUserListAndCount(
    @Query() { pagination, sorts, filters }: GetUserListRequestDto,
  ) {
    return this._usersService.getUserListAndCount(pagination, filters, sorts);
  }
}
