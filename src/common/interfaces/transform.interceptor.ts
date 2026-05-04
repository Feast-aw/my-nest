// 统一拦截封装 拦截器
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './response.interface';
import { ResponseUtil } from './response.util';
//NestInterceptor 是 NestJS 中定义的一个接口，
// 用于创建拦截器。拦截器是一种特殊的类，可以在
// 方法执行前后进行额外的处理，例如修改请求或响应数据、
// 添加日志、处理异常等。

// ExecutionContext 是 NestJS 中提供的一个接口，
// 用于获取当前请求的上下文信息，例如请求对象、响应对象、
// 处理程序等。通过 ExecutionContext，我们可以访问到当前请求的
// 相关信息，并在拦截器中进行相应的处理。

// CallHandler 是 NestJS 中提供的一个接口，
// 用于处理方法调用。它包含一个 handle() 方法，
// 当拦截器调用 handle() 方法时，NestJS 会执行被拦截的方法，并返回一个 Observable 对象。

//Observable 是 RxJS 中的一个核心概念，表示一个可观察的数据流。
// 它可以发出零个或多个值，并且可以是同步或异步的。在 NestJS 中，
// 拦截器通常返回一个 Observable 对象，以便在方法执行完成后对响应数据进行处理。

//map 是 RxJS 中的一个操作符，用于对 Observable 发出的每个值进行转换。
// 在拦截器中，我们可以使用 map 操作符来修改方法执行后的响应数据，例如将其包装成统一的响应格式。

//ApiResponse 是我们定义的一个接口，表示统一的响应格式。
// 它包含 success、data、message、errorCode 和 timestamp 等字段，
// 用于描述请求的结果和相关信息。

// ResponseUtil 是我们定义的一个工具类，提供了 success() 和 error() 方法，
// 用于创建统一格式的成功响应和错误响应。

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<any>> {
    return next.handle().pipe(
      map((data) => {
        // 在这里可以对响应数据进行统一处理，例如包装成统一的响应格式
        return ResponseUtil.success(data);
      })
    );
  }
}
