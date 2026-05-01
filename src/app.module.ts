import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//@Module 是 Nest.js 中的一个装饰器，用于定义一个模块类。模块是 Nest.js 中的一个重要概念，
// 它用于组织代码和提供依赖注入的上下文。通过使用 @Module() 装饰器，你可以指定这个模块包含
// 哪些控制器、提供哪些服务，以及导入哪些其他模块。在这个例子中，
// AppModule 包含了 AppController 和 AppService，并且没有导入其他模块。

//@Module 中的
// imports 数组用于导入其他模块，controllers 数组用于注册控制器，
// providers 数组用于注册提供者（服务）
// 在这个例子中，AppModule 没有导入其他模块， 但注册了 AppController 和 AppService。
// 这样，AppController 就可以通过依赖注入使用 AppService 中定义的方法。
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
