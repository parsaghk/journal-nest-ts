import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EntityId } from '@shared/types';
import { CitiesService } from './cities.service';
import {
  GetCityListRequestDto,
  GetCityListResponseDto,
  GetSingleCityResponseDto,
} from './dto';

@Controller('cities')
export class CitiesController {
  public constructor(private readonly _citiesService: CitiesService) {}

  @Get('/states/:stateId')
  @Serialize(GetCityListResponseDto)
  public getCityListOfSate(
    @Param('stateId', new ParseUUIDPipe()) stateId: EntityId,
  ) {
    return this._citiesService.getCityListOfSate(stateId);
  }

  @Get('/:cityId')
  @Serialize(GetSingleCityResponseDto)
  public getSingleCity(@Param('cityId', new ParseUUIDPipe()) cityId: EntityId) {
    return this._citiesService.getSingleCity(cityId);
  }

  @Get('/')
  @Serialize(GetCityListResponseDto)
  public getCityListAndCount(
    @Query() { pagination, sorts, filters }: GetCityListRequestDto,
  ) {
    return this._citiesService.getCityListAndCount(pagination, filters, sorts);
  }
}
