export type ExchangeType = 'direct' | 'topic' | 'headers' | 'fanout' | 'match';

export class Exchange {
  durable?: boolean | undefined;
  internal?: boolean | undefined;
  autoDelete?: boolean | undefined;
  alternateExchange?: string | undefined;
  arguments?: any;

  constructor(
    public readonly name: string,
    public readonly type: ExchangeType = 'direct',
  ) {}
}

export class ExchangeBuilder {
  static build() {
    const exchange = new Exchange('');

    return exchange;
  }
}
