import { Connection, Channel } from 'amqplib';

export class RabbitMQAbstractService {
  protected conn!: Connection;
  protected channel!: Channel;
}
