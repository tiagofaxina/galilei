import { RequestHandler } from 'express';

export interface IValidationMiddleware {
  process(type: any): RequestHandler;
}
