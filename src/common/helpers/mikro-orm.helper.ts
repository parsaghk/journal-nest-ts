import {
  FilterQuery,
  PlainObject,
  QueryOrder,
  QueryOrderMap,
} from '@mikro-orm/core';
import { PlainLiteralObject } from '@nestjs/common';
import {
  AbstractFilterDto,
  AbstractSortDto,
  DateRangeFilterDto,
  NumberRangeFilterDto,
} from '@shared/dto';
import { AbstractEntity } from '@shared/entities';
import { SortEnum } from '@shared/enums';
import { unflatten } from 'flat';
import flatten = require('flat');
import moment = require('moment');
import _ = require('lodash');

export class MikroOrmHelper {
  public static convertSortDtoToQueryOrderList<
    U extends AbstractSortDto,
    V extends AbstractEntity,
  >(sortDto: U): QueryOrderMap<V> {
    return unflatten(
      Object.entries(flatten(sortDto) as PlainObject).reduce(
        (prev: PlainObject, [key, value]) => {
          Object.assign(prev, {
            [`${key}`]:
              value === SortEnum.ASC
                ? QueryOrder.ASC_NULLS_LAST
                : QueryOrder.DESC_NULLS_LAST,
          });
          return prev;
        },
        {},
      ),
    );
  }

  public static convertFilterDtoToQueryFilter<
    U extends AbstractFilterDto,
    T extends AbstractEntity,
  >(filterDto: U): FilterQuery<T> {
    return Object.entries(filterDto).reduce((prev, [key, value]) => {
      const filter: PlainLiteralObject = {};
      if (value instanceof NumberRangeFilterDto) {
        if (value.from) {
          filter.$gte = value.from;
        }
        if (value.to) {
          filter.$lte = value.to;
        }
      }
      if (value instanceof DateRangeFilterDto) {
        if (value.from) {
          filter.$gte = moment(value.from).utc().format();
        }
        if (value.to) {
          filter.$lte = moment.utc(value.to).format();
        }
      }
      if (Array.isArray(value)) {
        filter.$in = value;
      }
      if (value instanceof AbstractFilterDto) {
        Object.assign(filter, this.convertFilterDtoToQueryFilter(value));
      }
      if (typeof value === 'string' && value.startsWith('regex:')) {
        filter.$re = value.replace('regex:', '');
      }
      return { ...prev, [key]: !_.isEmpty(filter) ? filter : value };
    }, {});
  }
}
