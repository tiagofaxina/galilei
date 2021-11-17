import { isObject } from 'class-validator';
import { HttpStatus } from '@configs/enums';
import { ErrorResponseDTO } from '@dtos/error-response.dto';
import { ValidationErrorDTO } from '@dtos/validation-error.dto';
import { BaseException } from './base.exception';

export class HttpBaseException extends BaseException {
  private response: ErrorResponseDTO;

  constructor(
    message: string,
    reason?: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    error?: any,
    data?: any,
  ) {
    super(httpStatus, message, reason, error, data);
    this.response = this.createResponse(error);
  }

  private createResponse = (error?: any) => {
    if (
      isObject(error) &&
      !Array.isArray(error) &&
      error instanceof ValidationErrorDTO
    ) {
      return new ErrorResponseDTO(this.message, this.reason, this.httpStatus, [
        error,
      ]);
    } else if (Array.isArray(error) && error[0] instanceof ValidationErrorDTO) {
      return new ErrorResponseDTO(
        this.message,
        this.reason,
        this.httpStatus,
        error,
      );
    }

    return new ErrorResponseDTO(this.message, this.reason, this.httpStatus);
  };

  public getResponse = () => {
    return this.response;
  };
}
