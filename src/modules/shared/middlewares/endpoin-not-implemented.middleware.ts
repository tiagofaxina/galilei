import { NextFunction, Request, Response } from 'express';
import { HttpMessages, HttpStatus } from '@configs/enums';
import { ErrorResponseDTO } from '@dtos/error-response.dto';
import { IEndpointNotImplementedMiddleware } from './endpoint-not-implemented.middleware.interface';

export class EndpointNotImplementedMiddleware
  implements IEndpointNotImplementedMiddleware
{
  process = (
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Response => {
    const err = new ErrorResponseDTO(
      'Resource not found',
      HttpMessages.NOT_IMPLEMENTED,
      HttpStatus.NOT_IMPLEMENTED,
    );
    return response.status(HttpStatus.NOT_IMPLEMENTED).send(err);
  };
}
