import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityId } from '@shared/types';
import {
  GetSingleStateResponseDto,
  GetStateListRequestDto,
  GetStateListResponseDto,
} from './dto';
import { StatesService } from './states.service';

@ApiTags('Article States')
@Controller('states')
export class StatesController {
  public constructor(private readonly _statesService: StatesService) {}

  @Get('/countries/:countryId')
  @Serialize(GetStateListResponseDto)
  public getStateListOfCountry(
    @Param('countryId', new ParseUUIDPipe()) countryId: EntityId,
  ) {
    return this._statesService.getStateListOfCountry(countryId);
  }

  @Get('/:articleId')
  @Serialize(GetSingleStateResponseDto)
  public getSingleState(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._statesService.getSingleState(articleId);
  }

  @Get('/')
  @Serialize(GetStateListResponseDto)
  public getStateListAndCount(
    @Query() { pagination, sorts, filters }: GetStateListRequestDto,
  ) {
    return this._statesService.getStateListAndCount(pagination, filters, sorts);
  }
}
