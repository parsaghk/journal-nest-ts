import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityId } from '@shared/types';
import {
  GetSingleUserResponseDto,
  GetUserListRequestDto,
  GetUserListResponseDto,
} from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get('/jurors')
  @Serialize(GetUserListResponseDto)
  public getAllJurorList() {
    return this._usersService.getAllJurorList();
  }

  @Get('/editors')
  @Serialize(GetUserListResponseDto)
  public getAllEditorList() {
    return this._usersService.getAllEditorList();
  }

  @Get('/:userId')
  @Serialize(GetSingleUserResponseDto)
  public getSingleUser(@Param('userId', new ParseUUIDPipe()) userId: EntityId) {
    return this._usersService.getSingleUser(userId);
  }

  @Get('/')
  @Serialize(GetUserListResponseDto)
  public getUserListAndCount(
    @Query() { pagination, sorts, filters }: GetUserListRequestDto,
  ) {
    return this._usersService.getUserListAndCount(pagination, filters, sorts);
  }
}
