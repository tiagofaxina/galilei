import { classToPlain } from 'class-transformer';
import { InternalServerErrorException } from '@exceptions/internal-server-error.exception';
import { NotFoundException } from '@exceptions/not-found.exception';
import { StockDTO } from '@stock/dtos';
import { IStockRepository } from '@stock/repository';
import { IRabbitMQStockService } from './rabbit-mq-stock.service.interface';
import { IStockService } from './stock.service.interface';

export class StockService implements IStockService {
  constructor(
    private readonly stockRepository: IStockRepository,
    private readonly rabbitMQStockService: IRabbitMQStockService,
  ) {
    this.rabbitMQStockService.start();
  }

  get = async (): Promise<StockDTO[]> => {
    try {
      const stock = await this.stockRepository.get();
      console.log(stock);
      return stock;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  update = async (updateStock: StockDTO): Promise<StockDTO | undefined> => {
    const stockDTO = await this.stockRepository.update(updateStock);
    if (!stockDTO) {
      throw new NotFoundException('Stock not found');
    }

    this.rabbitMQStockService.publish(classToPlain(updateStock));

    return stockDTO;
  };
}
