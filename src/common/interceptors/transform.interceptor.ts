import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If response already has the structure, return as is
        if (data && typeof data === 'object' && 'message' in data) {
          return data;
        }
        // Otherwise, wrap it
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Success',
          data,
        };
      }),
    );
  }
}
