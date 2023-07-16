import { PaginationDto } from '@shared/dto';

export class PageMetaDto {
  public readonly page: number;

  public readonly take: number;

  public readonly itemCount: number;

  public readonly pageCount: number;

  public readonly hasPreviousPage: boolean;

  public readonly hasNextPage: boolean;

  public constructor(pageOptionsDto: PaginationDto, itemCount: number) {
    this.page = pageOptionsDto.pageIndex;
    this.take = pageOptionsDto.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
