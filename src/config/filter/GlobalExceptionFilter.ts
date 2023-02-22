import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost): any {
    console.log("get into filter");
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exeResponse = exception.response;
    const statusCode = exeResponse.statusCode || exeResponse.code;
    const message = Array.isArray(exeResponse.message)
      ? exception.response.message[0]
      : exeResponse.message
        ? exeResponse.message
        : exeResponse.msg;
    response.status(HttpStatus.OK).json({
      status: statusCode,
      message: message,
    });
  }
}