import { plainToClass } from 'class-transformer';
import { isEmpty, validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationErrorDTO } from '@dtos/validation-error.dto';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { IValidationMiddleware } from './validation.middleware.interface';

export class ValidationMiddleware implements IValidationMiddleware {
  process(type: any): RequestHandler {
    return async (
      request: Request,
      _response: Response,
      next: NextFunction,
    ) => {
      const { body, params, query } = request;

      const emptyBody = isEmpty(body) || !Object.keys(body).length;
      const emptyParams = isEmpty(params) || !Object.keys(params).length;

      let dataToValidate;

      if (!emptyBody) {
        dataToValidate = body;
      } else if (!emptyParams) {
        dataToValidate = params;
      } else {
        dataToValidate = query;
      }

      const object = plainToClass(type, dataToValidate);
      const errors = await validate(object);

      if (errors.length > 0) {
        const requestErrors = ValidationErrorDTO.build(errors);
        next(
          new BadRequestException(
            `Invalid request ${emptyBody ? 'params' : 'body'}`,
            'Some fields are in wrong format',
            requestErrors,
          ),
        );
        return;
      }

      next();
    };
  }
}
