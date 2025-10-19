import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;

    response.status(statusCode).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
