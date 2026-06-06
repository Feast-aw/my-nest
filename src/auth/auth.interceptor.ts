import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap, toArray, catchError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 请求处理之前打印日志
    console.log('before interceptor');
    return next.handle().pipe(
      // 将用户名转换为大写
      map((data: string) => data.toUpperCase()),
      // 过滤出数据中包含A的数据
      map((data: string) => data.includes('a')),
      //打印过滤后的内容
      tap((data) => console.log('after interceptor', data)),
      // 转换为数组
      toArray(),
      // 错误处理
      catchError((err) => {
        console.error('Error in interceptor:', err);
        throw err; // 继续抛出错误以便后续处理
      }),
    );
  }
}
