import { Message, Replies, Options } from 'amqplib';
import { Exchange, PublishMessage, Queue } from '../entities';

export interface IRabbitMQService {
  start: (prefetch?: number) => Promise<void>;

  assertExchange: (exchange: Exchange) => Promise<void>;

  assertQueue: (queue: Queue) => Promise<void>;

  bindQueue: (
    queue: Queue,
    exchange: Exchange,
    bindingKey?: string,
  ) => Promise<void>;

  publishInQueue: (message: PublishMessage, queue: Queue) => boolean;

  publishInExchange: (
    message: PublishMessage,
    exchange: Exchange,
    close?: boolean,
  ) => boolean;

  closeConnection: () => void;

  consume: (
    queue: Queue,
    callback: (message: Message | null) => void,
    options: Options.Consume,
  ) => Promise<Replies.Consume>;

  consumeNoAck: (
    queue: Queue,
    callback: (message: Message | null) => void,
    options?: Options.Consume,
  ) => Promise<Replies.Consume>;

  ack: (message: Message, allUpTo?: boolean) => void;
  reject: (message: Message, requeue?: boolean) => void;
}
