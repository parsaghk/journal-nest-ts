import { NotFoundError } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundError)
export class MikroOrmExceptionFilter implements ExceptionFilter {
  public catch(exception: NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: name,
    };
    response.status(HttpStatus.NOT_FOUND).json(errorResponse);
  }
}
