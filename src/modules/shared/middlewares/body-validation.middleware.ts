import { isEmpty } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BodyNotSendException } from '@shared/exceptions';
import { IBodyValidationMiddleware } from './body-validation.middleware.interface';

export class BodyValidationMiddleware implements IBodyValidationMiddleware {
  process = (request: Request, response: Response, next: NextFunction) => {
    if (!request || isEmpty(request)) {
      throw new BodyNotSendException();
    }

    if (request?.body) {
      if (isEmpty(request?.body) || Object.keys(request?.body).length === 0) {
        throw new BodyNotSendException();
      }
    }

    next();
  };
}
