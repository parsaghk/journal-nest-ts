import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { EntityListResponseDto } from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor<T> implements NestInterceptor {
  public constructor(private _dto: { new (): T }) {}

  public intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<T | EntityListResponseDto<T>> {
    return handler.handle().pipe(
      map((response: unknown) => {
        if (response instanceof EntityListResponseDto) {
          Object.assign(
            response.data,
            plainToInstance(this._dto, response.data, {
              excludeExtraneousValues: true,
            }),
          );
          return response;
        }
        return plainToInstance(this._dto, response, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
