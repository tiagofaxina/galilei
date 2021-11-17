import { InternalServerErrorException } from '@exceptions/internal-server-error.exception';

export class JwtSignException extends InternalServerErrorException {
  /**
   * Instantiate an `JwtSignException` Exception.
   *
   * @example
   * `throw new JwtSignException()`
   *
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(error?: any, data?: any) {
    super('Failed to generate token', undefined, error, data);
  }
}
