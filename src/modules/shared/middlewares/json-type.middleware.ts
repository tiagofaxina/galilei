import { NextFunction, Request, Response } from 'express';
import { UnsupportedMediaTypeException } from '@exceptions/unsupported-media-type.exception';
import { IJsonTypeMiddleware } from './json-type.middleware.interface';

export class JsonTypeMiddleware implements IJsonTypeMiddleware {
  process = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (!request?.is('json')) {
      next(
        new UnsupportedMediaTypeException(
          undefined,
          'Request body must be on JSON format',
        ),
      );
    }

    next();
  };
}
