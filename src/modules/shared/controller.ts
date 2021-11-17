import { NextFunction, Request, Response, Router } from 'express';
import { MethodNotAllowedException } from '@exceptions/method-not-allowed.exception';

export abstract class Controller {
  public path = '/';

  public readonly router = Router();

  protected handle405 = (
    _request: Request,
    _response: Response,
    _next: NextFunction,
  ): void => {
    throw new MethodNotAllowedException();
  };
}
