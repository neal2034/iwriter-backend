import { HttpException, HttpStatus } from "@nestjs/common";

export class AppBaseException extends HttpException{
  constructor(error:Record<string, unknown>, status=HttpStatus.BAD_REQUEST) {
    super(error, status);
  }
}