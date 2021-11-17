import { InternalServerErrorException } from '@exceptions/internal-server-error.exception';

export class DateException extends InternalServerErrorException {
  /**
   * Instantiate an `DateException` Exception.
   *
   * @example
   * `throw new DateException()`
   *
   * @param message string to inform error message.
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(message: string, error?: any, data?: any) {
    super(message, undefined, error, data);
  }
}
