import { OmitType } from '@nestjs/swagger';
import { GetCountryListRequestDto } from '../get-country-list-request-dto';

export class GetAllCountryListRequestDto extends OmitType(
  GetCountryListRequestDto,
  ['pagination'],
) {}
