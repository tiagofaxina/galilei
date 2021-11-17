import { Consume, Exchange, PublishMessage, Queue } from '@rabbit-mq/entities';
import { IRabbitMQService } from '@rabbit-mq/services';
import { IRabbitMQStockService } from './rabbit-mq-stock.service.interface';

const QUEUE_NAME = 'stock-update';
const EXCHANGE_NAME = 'stock-update.exchange';

export class RabbitMQStockService implements IRabbitMQStockService {
  private stockQueue!: Queue;
  private exchange!: Exchange;
  private consumer!: Consume;
  private message!: PublishMessage;

  constructor(private readonly rabbitMQService: IRabbitMQService) {
    this.initQueue();
    this.initExchange();
    this.initMessage();
    this.initConsume();
  }

  private initQueue = () => {
    this.stockQueue = new Queue(QUEUE_NAME);
    this.stockQueue.durable = true;
  };

  initExchange = () => {
    this.exchange = new Exchange(EXCHANGE_NAME, 'direct');
    this.exchange.durable = true;
  };

  initConsume = () => {
    this.consumer = new Consume();
    this.consumer.noAck = false;
  };

  initMessage = () => {
    this.message = new PublishMessage(QUEUE_NAME);
    this.message.persistent = true;
  };

  start = async () => {
    await this.rabbitMQService.start(1);
    await this.rabbitMQService.assertExchange(this.exchange);
    await this.rabbitMQService.assertQueue(this.stockQueue);
    await this.rabbitMQService.bindQueue(
      this.stockQueue,
      this.exchange,
      QUEUE_NAME,
    );
  };

  publish = (
    message: string | Record<string, unknown> | number,
    closeConnection = true,
  ) => {
    this.message.content = message;
    return this.rabbitMQService.publishInExchange(
      this.message,
      this.exchange,
      closeConnection,
    );
  };
}
