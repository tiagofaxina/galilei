import { BadRequestException } from '@exceptions/bad-request.exception';

export class BodyNotSendException extends BadRequestException {
  /**
   * Instantiate an `BodyNotSendException` Exception.
   *
   * @example
   * `throw new BodyNotSendException()`
   *
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(error?: any, data?: any) {
    super('Request body not sent on request', undefined, error, data);
  }
}
