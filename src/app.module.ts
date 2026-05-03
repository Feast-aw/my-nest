import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
//@Module 是 Nest.js 中的一个装饰器，用于定义一个模块类。模块是 Nest.js 中的一个重要概念，
// 它用于组织代码和提供依赖注入的上下文。通过使用 @Module() 装饰器，你可以指定这个模块包含
// 哪些控制器、提供哪些服务，以及导入哪些其他模块。在这个例子中，
// AppModule 包含了 AppController 和 AppService，并且没有导入其他模块。

//@Module 中的
// imports 数组用于导入其他模块，controllers 数组用于注册控制器，
// providers 数组用于注册提供者（服务）
// 在这个例子中，AppModule 没有导入其他模块， 但注册了 AppController 和 AppService。
// 这样，AppController 就可以通过依赖注入使用 AppService 中定义的方法。

//TypeOrmModule 是 Nest.js 提供的一个模块，用于集成 TypeORM，这是一个流行的 ORM（对象关系映射）库，
// 用于与数据库进行交互。通过导入 TypeOrmModule，你可以在 Nest.js 应用中使用 TypeORM 的功能来定义实体、创建数据库连接、执行查询等操作。
// 在 AppModule 中导入 TypeOrmModule 可以让你在整个应用中使用 TypeORM 来管理数据库操作。
@Module({
  imports: [
    UsersModule,
    AuthModule,
    TodosModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库主机地址
      port: 3306, // 数据库端口
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'nest_demo', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件路径
      synchronize: true, // 是否自动同步数据库结构（开发环境使用，生产环境慎用）
      logging: true, // 是否启用 SQL 查询日志
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
