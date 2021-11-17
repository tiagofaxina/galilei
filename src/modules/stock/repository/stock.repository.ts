import { defaultData } from '@stock/data/default-data';
import { StockDTO } from '@stock/dtos';
import { IStockRepository } from './stock.repository.interface';

export class StockRepository implements IStockRepository {
  get = async (): Promise<StockDTO[]> => {
    return await new Promise((resolve) =>
      resolve(defaultData.data.sort((a, b) => a.name.localeCompare(b.name))),
    );
  };

  update = async (updateStock: StockDTO): Promise<StockDTO | undefined> => {
    return await new Promise((resolve) => {
      const findStockIndex = defaultData.data.findIndex(
        (o) => o.name === updateStock.name,
      );

      if (!findStockIndex) {
        resolve(undefined);
      }
      defaultData.data.splice(findStockIndex, 1);
      defaultData.data.push(updateStock);
      resolve(updateStock);
    });
  };
}
