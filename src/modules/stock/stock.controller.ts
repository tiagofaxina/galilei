import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@configs/enums';
import { SuccessResponseDTO } from '@dtos/success-response.dto';
import { RabbitMQService } from '@rabbit-mq/services';
import { Controller } from '@shared/controller';
import {
  IBodyValidationMiddleware,
  IJsonTypeMiddleware,
  IValidationMiddleware,
} from '@shared/middlewares';
import { StockDTO } from './dtos';
import { StockRepository } from './repository';
import { IStockService, StockService } from './services';
import { RabbitMQStockService } from './services/rabbit-mq-stock.service';

export class StockController extends Controller {
  private stockService: IStockService;

  constructor(
    private readonly bodyValidationMiddleware: IBodyValidationMiddleware,
    private readonly jsonTypeMiddleware: IJsonTypeMiddleware,
    private readonly validationMiddleware: IValidationMiddleware,
  ) {
    super();
    this.path = '/stock';
    this.routes();
    console.log(
      process.env.RABBITMQ_HOST as string,
      process.env.RABBITMQ_USER as string,
      process.env.RABBITMQ_PASSWORD as string,
    );

    this.stockService = new StockService(
      new StockRepository(),
      new RabbitMQStockService(
        new RabbitMQService(
          process.env.RABBITMQ_HOST as string,
          process.env.RABBITMQ_USER as string,
          process.env.RABBITMQ_PASSWORD as string,
        ),
      ),
    );
  }

  private get = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stockData = await this.stockService.get();
      console.log(stockData);
      const requestResponseData = new SuccessResponseDTO(
        'Success',
        stockData,
        HttpStatus.OK,
      );

      response.status(requestResponseData.httpStatus).send(requestResponseData);
    } catch (error) {
      next(error);
    }
  };

  private update = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { body } = request;
      const stockData = await this.stockService.update(body);
      const requestResponseData = new SuccessResponseDTO(
        'Update successfully',
        stockData,
        HttpStatus.CREATED,
      );

      response.status(requestResponseData.httpStatus).send(requestResponseData);
    } catch (error) {
      next(error);
    }
  };

  public routes = () => {
    this.router.get(`${this.path}`, this.get);
    this.router.put(
      `${this.path}`,
      this.bodyValidationMiddleware.process,
      this.jsonTypeMiddleware.process,
      this.validationMiddleware.process(StockDTO),
      this.update,
    );
  };
}
