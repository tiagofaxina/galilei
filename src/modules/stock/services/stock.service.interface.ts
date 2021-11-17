import { StockDTO } from '@stock/dtos';

export interface IStockService {
  get: () => Promise<StockDTO[]>;

  update: (updateStock: StockDTO) => Promise<StockDTO | undefined>;
}
