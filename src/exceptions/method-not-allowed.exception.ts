import { HttpMessages, HttpStatus } from '@configs/enums';
import { HttpBaseException } from './http-base.exception';

export class MethodNotAllowedException extends HttpBaseException {
  /**
   * Instantiate a `MethodNotAllowedException` Exception.
   *
   * @example
   * `throw new MethodNotAllowedException()`
   *
   * @param message string to inform error message.
   * @param reason string to inform error reason.
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(
    message: string = HttpMessages.METHOD_NOT_ALLOWED,
    reason?: string,
    error?: any,
    data?: any,
  ) {
    super(message, reason, HttpStatus.METHOD_NOT_ALLOWED, error, data);
  }
}
