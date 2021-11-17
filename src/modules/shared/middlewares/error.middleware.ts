import { NextFunction, Request, Response } from 'express';
import { HttpMessages, HttpStatus } from '@configs/enums';
import { HttpBaseException } from '@exceptions/http-base.exception';
import { IErrorMiddleware } from './error.middleware.interface';

export class ErrorMiddleware implements IErrorMiddleware {
  process = (
    exception: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ): Response => {
    if (exception instanceof HttpBaseException) {
      return response
        .status(exception.httpStatus)
        .send(exception.getResponse());
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpMessages.INTERNAL_SERVER_ERROR,
    });
  };
}
