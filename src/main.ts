import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interfaces/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
//ValidationPipe 是 Nest.js 提供的一个内置管道，用于验证和转换请求数据。它可以帮助你确保传入的数据符合预期的格式和类型，并且可以自动将请求体转换为 DTO（数据传输对象）类实例。通过使用 ValidationPipe，你可以轻松地实现数据验证和转换，提升应用的健壮性和安全性。
//在 main.ts 中使用 ValidationPipe，可以全局应用数据验证和转换逻辑，确保所有请求的数据都经过验证和转换处理。这有助于防止无效数据进入应用，并且可以简化控制器中的代码，使其更专注于业务逻辑。

// useGlobalInterceptors 是 Nest.js 提供的一个方法，用于在应用程序级别注册全局拦截器。
// 拦截器是一种特殊的类，可以在方法执行前后进行额外的处理，例如修改请求或响应数据、添加日志、
// 处理异常等。通过使用 useGlobalInterceptors，你可以确保所有控制器和路由处理程序都应用了指定的拦截器，
// 从而实现统一的请求和响应处理逻辑。在 main.ts 中注册全局拦截器，可以确保整个应用程序的一致性和可维护性，
// 避免在每个控制器中重复注册相同的拦截器。

// useGlobalPipes 是 Nest.js 提供的一个方法，用于在应用程序级别注册全局管道。管道是一种特殊的类，
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局使用统一响应格式的拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局使用统一异常处理的过滤器
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 剔除 DTO 中未声明的属性
      forbidNonWhitelisted: true, // 发现未声明属性就报错（可选）
      transform: true, // 把请求体转为 DTO 类实例（依赖 class-transformer）
      transformOptions: { enableImplicitConversion: true }, // 自动把基本类型转换（string -> number）——可选但常用
    })
  );
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
