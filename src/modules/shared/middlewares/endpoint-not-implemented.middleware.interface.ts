import { NextFunction, Request, Response } from 'express';

export interface IEndpointNotImplementedMiddleware {
  process: (request: Request, response: Response, _next: NextFunction) => void;
}
