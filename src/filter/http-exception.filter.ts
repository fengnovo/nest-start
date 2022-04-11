/**
 Nest 不光提供了拦截器，也提供了过滤器，就代码结构而言，和拦截器很相似。处理类似‘500 Internal server error’的错误

内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

`nest g filter http-exception filter`

 Nest提供了一个内置的 HttpException 类，它从 @nestjs/common 包中导入。
 对于典型的基于 HTTP REST/GraphQL API 的应用程序，最佳实践是在发生某些错误情况时发送标准 HTTP 响应对象。
HttpException 构造函数有两个必要的参数来决定响应:

response 参数定义 JSON 响应体。它可以是 string 或 object，如下所述。
status参数定义HTTP状态代码。

默认情况下，JSON 响应主体包含两个属性：

statusCode：默认为 status 参数中提供的 HTTP 状态代码
message:基于状态的 HTTP 错误的简短描述
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.info(logFormat);
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
