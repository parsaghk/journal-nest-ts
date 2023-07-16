import { PageMetaDto } from '@shared/dto';

export class EntityListResponseDto<T> {
  public readonly data: T[];

  public readonly meta: PageMetaDto;

  public constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
