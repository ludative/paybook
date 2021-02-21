import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T=null> {
    status: number;
    timestamp: number;
    path: string;
    message?: string
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
        return next.handle().pipe(map(data => {
            const req = context.switchToHttp().getRequest();
            const res = context.switchToHttp().getResponse();
            return {
                status: res.statusCode,
                timestamp: new Date().valueOf(),
                path: req.url,
                data
            }
        }));
    }
}
