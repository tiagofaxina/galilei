import { StockDTO } from '@stock/dtos';

export interface IStockRepository {
  get: () => Promise<StockDTO[]>;

  update: (updateStock: StockDTO) => Promise<StockDTO | undefined>;
}
