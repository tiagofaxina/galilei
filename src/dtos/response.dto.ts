import { HttpStatus } from '@configs/enums';

export class ResponseDTO {
  constructor(
    public readonly httpStatus: HttpStatus,
    public readonly message: string,
    public readonly code?: string,
  ) {}
}
