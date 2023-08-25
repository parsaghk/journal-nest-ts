import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EntityId } from '@shared/types';
import { CountriesService } from './countries.service';
import {
  GetCountryListRequestDto,
  GetCountryListResponseDto,
  GetSingleCountryResponseDto,
} from './dto';

@Controller('countries')
export class CountriesController {
  public constructor(private readonly _countriesService: CountriesService) {}

  @Get('/:articleId')
  @Serialize(GetSingleCountryResponseDto)
  public getSingleCountry(
    @Param('articleId', new ParseUUIDPipe()) articleId: EntityId,
  ) {
    return this._countriesService.getSingleCountry(articleId);
  }

  @Get('/')
  @Serialize(GetCountryListResponseDto)
  public getCountryListAndCount(
    @Query() { pagination, sorts, filters }: GetCountryListRequestDto,
  ) {
    return this._countriesService.getCountryListAndCount(
      pagination,
      filters,
      sorts,
    );
  }
}
