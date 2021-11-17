import { NextFunction, Request, Response } from 'express';

export interface IErrorMiddleware {
  process: (
    exception: Error,
    request: Request,
    response: Response,
    _next: NextFunction,
  ) => void;
}
