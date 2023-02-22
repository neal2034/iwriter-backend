import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseTransformInterceptor implements NestInterceptor<any, any> {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 0,
          message: 'success',
          data,
        };
      }),
    );
  }
}
