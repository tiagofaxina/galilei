import { connect, Message, Replies, Options } from 'amqplib';
import { Exchange, PublishMessage, Queue } from '../entities';
import { IRabbitMQService } from './rabbit-mq.service.interface';
import { RabbitMQAbstractService } from './rabbitmq-abstract.service';

export class RabbitMQService
  extends RabbitMQAbstractService
  implements IRabbitMQService
{
  private uri: string;
  private host: string;
  private user: string;
  private password: string;

  constructor(host: string, user: string, password: string) {
    super();
    this.host = host;
    this.user = user;
    this.password = password;
    this.uri = `amqp://${this.user}:${this.password}@${this.host}`;
  }

  async start(prefetch = 1): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
    this.channel.prefetch(prefetch);
  }

  assertExchange = async (exchange: Exchange) => {
    const { name, type, ...restOptions } = exchange;
    await this.channel.assertExchange(name, type, { ...restOptions });
  };

  assertQueue = async (queue: Queue) => {
    const { name, ...restOptions } = queue;
    await this.channel.assertQueue(name, { ...restOptions });
  };

  bindQueue = async (queue: Queue, exchange: Exchange, bindingKey?: string) => {
    const { name: queueName } = queue;
    const { name: exchangename } = exchange;

    await this.channel.bindQueue(
      queueName,
      exchangename,
      bindingKey ?? queueName,
    );
  };

  publishInQueue(message: PublishMessage, queue: Queue): boolean {
    const { content, routingKey: _routingKey, ...restMessageOptions } = message;
    const { name } = queue;

    return this.channel.sendToQueue(
      name,
      Buffer.from(JSON.stringify(content)),
      restMessageOptions,
    );
  }

  publishInExchange(
    message: PublishMessage,
    exchange: Exchange,
    close?: boolean,
  ): boolean {
    const { content, routingKey, ...restMessageOptions } = message;
    const { name } = exchange;
    const publish = this.channel.publish(
      name,
      routingKey,
      Buffer.from(JSON.stringify(content)),
      restMessageOptions,
    );

    if (close) {
      this.closeConnection();
    }

    return publish;
  }

  closeConnection = () => {
    const connectionCloseTimeout = setTimeout(() => {
      this.conn.close();
      clearTimeout(connectionCloseTimeout);
    }, 500);
  };

  consume = async (
    queue: Queue,
    callback: (message: Message | null) => void,
    options: Options.Consume = {},
  ): Promise<Replies.Consume> => {
    const { noAck } = options;
    return this.channel.consume(
      queue.name,
      (message) => {
        callback(message);
        if (!noAck && message) {
          this.channel.ack(message);
        }
      },
      options,
    );
  };

  consumeNoAck = async (
    queue: Queue,
    callback: (message: Message | null) => void,
    options?: Options.Consume,
  ): Promise<Replies.Consume> => {
    return this.channel.consume(
      queue.name,
      (message) => {
        callback(message);
      },
      options,
    );
  };

  ack = (message: Message, allUpTo?: boolean): void => {
    this.channel.ack(message, allUpTo);
  };

  reject = (message: Message, requeue?: boolean): void => {
    this.channel.reject(message, requeue);
  };
}
