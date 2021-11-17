import { HttpMessages, HttpStatus } from '@configs/enums';
import { HttpBaseException } from './http-base.exception';

export class NotFoundException extends HttpBaseException {
  /**
   * Instantiate a `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * @param message string to inform error message.
   * @param reason string to inform error reason.
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(
    message: string = HttpMessages.NOT_FOUND,
    reason?: string,
    error?: any,
    data?: any,
  ) {
    super(message, reason, HttpStatus.NOT_FOUND, error, data);
  }
}
