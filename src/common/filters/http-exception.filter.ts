// 全局异常处理
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { ApiResponse } from '../interfaces/response.interface';
import { ResponseUtil } from '../interfaces/response.util';
import { Response } from 'express';

//ExceptionFilter 是 NestJS 中定义的一个接口，用于创建异常过滤器。
// 异常过滤器是一种特殊的类，可以捕获和处理应用程序中的异常，例
// 如 HTTP 异常、数据库异常等。通过实现 ExceptionFilter 接口，
// 你可以定义自定义的异常处理逻辑，以便在发生异常时返回统一格式的响应。

//Catch 是 NestJS 中提供的一个装饰器，用于标记一个类为异常过滤器。
// 通过在类上使用 @Catch() 装饰器，你可以指定该类将捕获哪些类型的异常，例如 HttpException、
// Error 等。当发生指定类型的异常时，NestJS 会自动调用该过滤器来处理异常。

//ArgumentsHost 是 NestJS 中提供的一个接口，用于获取当前请求的上下文信息，例如请求对象、响应对象、
// 处理程序等。通过 ArgumentsHost，我们可以访问到当前请求的相关信息，并在异常过滤器中进行相应的处理。

//HttpException 是 NestJS 中定义的一个内置异常类，表示 HTTP 异常。它包含一个 statusCode 属性，
// 用于表示 HTTP 状态码，以及一个 message 属性，用于描述异常的详细信息。
// 当你在应用程序中抛出 HttpException 时，NestJS 会自动将其转换为相应的 HTTP 响应。

// Response 是 Express.js 中的一个对象，表示 HTTP 响应。它提供了各种方法和属性，
// 用于设置响应的状态码、头部信息、响应体等。在 NestJS 中，异常过滤器可以使用
// ArgumentsHost 获取到 Response 对象，并通过它来发送自定义的 HTTP 响应。

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    //exception 参数表示捕获到的异常对象，可以是任何类型的异常，
    // 例如 HttpException、Error 等。通过检查 exception 的类型和属性，
    // 你可以确定异常的具体信息，并根据需要进行处理。
    const ctx = host.switchToHttp(); // 获取 HTTP 上下文
    const response = ctx.getResponse<Response>(); // 获取 Express 响应对象

    let status = HttpStatus.INTERNAL_SERVER_ERROR; // 默认状态码为 500
    let message = 'Internal Server Error'; // 默认错误信息

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      // getResponse() 方法返回一个对象或字符串，包含异常的详细信息。它可以是一个字符串（通常是错误消息）
      // 或者一个对象（通常包含 message、errorCode 等属性）。通过检查 exceptionResponse
      // 的类型和内容，你可以提取出适当的错误信息，并将其包含在最终的响应中。
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const raw = (exceptionResponse as Record<string, unknown>).message;
        message = Array.isArray(raw) ? (raw as string[]).join(', ') : String(raw);
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // 发送统一格式的错误响应
    response.status(status).json(ResponseUtil.error(message, status));
  }
}
