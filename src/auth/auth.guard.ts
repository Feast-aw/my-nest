import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
//AuthGuard 是一个自定义的守卫类，继承自 PassportAuthGuard('jwt')，
// 这意味着它使用了 Passport 的 JWT 策略来进行认证。
// 当请求进入受保护的路由时，AuthGuard 会自动调用 JWT 策略来验证请求中的 JWT token。
//ExecutionContext 是 NestJS 提供的一个接口，表示当前的执行上下文。它包含了请求、响应、处理程序等信息。
//UnauthorizedException 是 NestJS 提供的一个内置异常类，用于表示未授权访问。当认证失败时，我们可以抛出这个异常来告知客户端他们没有权限访问该资源。
@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('请先登录');
    }
    return user as TUser;
  }
}
