import { Serialize } from '@common/decorators';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EntityId } from '@shared/types';
import { CountriesService } from './countries.service';
import {
  GetAllCountryListRequestDto,
  GetCountryListRequestDto,
  GetCountryListResponseDto,
  GetSingleCountryResponseDto,
} from './dto';

@Controller('countries')
export class CountriesController {
  public constructor(private readonly _countriesService: CountriesService) {}

  @Get('/all')
  @Serialize(GetCountryListResponseDto)
  public getAllCountryList(
    @Query() { sorts, filters }: GetAllCountryListRequestDto,
  ) {
    return this._countriesService.getAllCountryList(filters, sorts);
  }

  @Get('/:countryId')
  @Serialize(GetSingleCountryResponseDto)
  public getSingleCountry(
    @Param('countryId', new ParseUUIDPipe()) countryId: EntityId,
  ) {
    return this._countriesService.getSingleCountry(countryId);
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
