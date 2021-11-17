export interface IRabbitMQStockService {
  start: () => Promise<void>;
  publish: (
    message: string | Record<string, unknown> | number,
    closeConnection?: boolean,
  ) => boolean;
}
