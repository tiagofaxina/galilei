import { InternalServerErrorException } from '@exceptions/internal-server-error.exception';

export class JwtVerifyException extends InternalServerErrorException {
  /**
   * Instantiate an `JwtVerifyException` Exception.
   *
   * @example
   * `throw new JwtVerifyException()`
   *
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(error?: any, data?: any) {
    super('Failed to verify token', undefined, error, data);
  }
}
