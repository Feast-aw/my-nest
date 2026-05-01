import { Injectable } from '@nestjs/common';
//Injectable 是用来标记一个类可以被 Nest 的依赖注入系统管理的装饰器。
// 它告诉 Nest 这个类是一个提供者，可以在其他地方被注入和使用。
// 通过使用 @Injectable()，你可以将这个类注册为一个服务，
// 并在需要的地方通过构造函数注入来使用它。
// 这是 Nest.js 中实现依赖注入的一种方式，使得代码更加模块化和可测试。
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getUser(id: string): string {
    console.log(id);
    return 'User';
  }
  cereateUser(): string {
    return 'Create User';
  }
  deteteUser(id: string): string {
    return 'Delete User with id: ' + id;
  }
  updateUser(): string {
    return 'Update User';
  }
}
