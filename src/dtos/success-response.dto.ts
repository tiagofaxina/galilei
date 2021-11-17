import { HttpStatus } from '@configs/enums';
import { ResponseDTO } from './response.dto';

export class SuccessResponseDTO<D> extends ResponseDTO {
  public readonly data?: D;

  constructor(
    message: string,
    data?: D,
    httpStatus: HttpStatus = HttpStatus.OK,
    code?: string,
  ) {
    super(httpStatus, message, code);

    this.data = data;
  }
}
