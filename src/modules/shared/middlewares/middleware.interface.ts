import { NextFunction, Request, Response } from 'express';

export interface IMiddleware<R = Request> {
  process: (request: R, response: Response, next: NextFunction) => void;
}
