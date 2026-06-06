import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const result: Request = context.switchToHttp().getRequest();
    console.log('进入了拦截器', result.url);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`执行耗时: ${Date.now() - now}ms`)),
      map((data) => ({
        code: 200,
        message: 'OK',
        data: data as Record<string, unknown>, // 原控制器返回的数据
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
