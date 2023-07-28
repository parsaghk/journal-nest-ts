import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EntityId } from '@shared/types';
import { CitiesService } from './cities.service';
import {
  GetCityListRequestDto,
  GetCityListResponseDto,
  GetSingleCityResponseDto,
} from './dto';

@Controller('admin/cities')
export class CitiesController {
  public constructor(private readonly _citiesService: CitiesService) {}

  @Get('/:articleId')
  @Serialize(GetSingleCityResponseDto)
  public getSingleCity(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._citiesService.getSingleCity(articleId);
  }

  @Get('/')
  @Serialize(GetCityListResponseDto)
  public getCityListAndCount(
    @Query() { pagination, sorts, filters }: GetCityListRequestDto,
  ) {
    return this._citiesService.getCityListAndCount(pagination, filters, sorts);
  }
}
