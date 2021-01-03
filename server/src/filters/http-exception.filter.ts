import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();
        const errorMessage = Array.isArray(exceptionResponse?.message) ? exceptionResponse?.message?.[0] : exceptionResponse?.message;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: errorMessage ?? exception?.message ?? "INTERVAL_SERVER_ERROR"
            });
    }
}
