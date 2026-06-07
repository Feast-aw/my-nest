import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.reflector.get('SetUser', context.getHandler());
    const Myclass = this.reflector.get('MyClass', context.getClass());
    console.log(user, 'user');
    console.log(Myclass, 'Myclass');

    return true;
  }
}
