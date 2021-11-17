export class Queue {
  exclusive?: boolean | undefined;
  durable?: boolean | undefined;
  autoDelete?: boolean | undefined;
  arguments?: any;
  messageTtl?: number | undefined;
  expires?: number | undefined;
  deadLetterExchange?: string | undefined;
  deadLetterRoutingKey?: string | undefined;
  maxLength?: number | undefined;
  maxPriority?: number | undefined;

  constructor(public readonly name: string) {}
}

export class QueueBuilder {
  static build(queueName: string) {
    const queue = new Queue(queueName);
    queue.durable = true;
    return queue;
  }
}
