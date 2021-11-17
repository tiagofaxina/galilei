import { HttpMessages, HttpStatus } from '@configs/enums';
import { HttpBaseException } from './http-base.exception';

export class ForbiddenException extends HttpBaseException {
  /**
   * Instantiate a `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * @param message string to inform error message.
   * @param reason string to inform error reason.
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(
    message: string = HttpMessages.FORBIDDEN,
    reason?: string,
    error?: any,
    data?: any,
  ) {
    super(message, reason, HttpStatus.FORBIDDEN, error, data);
  }
}
