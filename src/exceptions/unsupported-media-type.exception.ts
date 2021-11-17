import { HttpMessages, HttpStatus } from '@configs/enums';
import { HttpBaseException } from './http-base.exception';

export class UnsupportedMediaTypeException extends HttpBaseException {
  /**
   * Instantiate an `UnsupportedMediaTypeException` Exception.
   *
   * @example
   * `throw new UnsupportedMediaTypeException()`
   *
   * @param message string to inform error message.
   * @param reason string to inform error reason.
   * @param error error object.
   * @param data data that throw the error.
   */
  constructor(
    message: string = HttpMessages.UNSUPPORTED_MEDIA_TYPE,
    reason?: string,
    error?: any,
    data?: any,
  ) {
    super(message, reason, HttpStatus.UNSUPPORTED_MEDIA_TYPE, error, data);
  }
}
