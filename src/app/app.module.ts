import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import {
  BodyValidationMiddleware,
  EndpointNotImplementedMiddleware,
  ErrorMiddleware,
  IBodyValidationMiddleware,
  IJsonTypeMiddleware,
  IValidationMiddleware,
  JsonTypeMiddleware,
  ValidationMiddleware,
} from '@shared/middlewares';
import { StockController } from '@stock/stock.controller';

function loggerMiddleware(
  request: express.Request,
  _response: express.Response,
  next: NextFunction,
) {
  console.log(`${request.method} ${request.path}`);
  next();
}

export class App {
  public app: Application;
  public port: number;
  private bodyValidationMiddleware!: IBodyValidationMiddleware;
  private jsonTypeMiddleware!: IJsonTypeMiddleware;
  private validationMiddleware!: IValidationMiddleware;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.initControllers();
    this.initializeErrorHandling();
  }

  private initMiddlewares = (): void => {
    this.app.use(helmet());
    this.app.use(
      cors({
        credentials: true,
        exposedHeaders: ['Content-Length', 'Content-Type'],
      }),
    );
    this.app.use(loggerMiddleware);
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.json());
    this.app.use(cookieParser());

    this.bodyValidationMiddleware = new BodyValidationMiddleware();
    this.jsonTypeMiddleware = new JsonTypeMiddleware();
    this.validationMiddleware = new ValidationMiddleware();
  };

  private initControllers = (): void => {
    const stockController = new StockController(
      this.bodyValidationMiddleware,
      this.jsonTypeMiddleware,
      this.validationMiddleware,
    );

    this.app.use('/', stockController.router);
  };

  private initializeErrorHandling = (): void => {
    const errorMiddleware = new ErrorMiddleware();
    const endpointNotImplementedMiddleware =
      new EndpointNotImplementedMiddleware();

    this.app.use(errorMiddleware.process);
    this.app.use(endpointNotImplementedMiddleware.process);
  };

  public listen = async (): Promise<void> => {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };
}
