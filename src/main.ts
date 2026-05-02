import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//ValidationPipe 是 Nest.js 提供的一个内置管道，用于验证和转换请求数据。它可以帮助你确保传入的数据符合预期的格式和类型，并且可以自动将请求体转换为 DTO（数据传输对象）类实例。通过使用 ValidationPipe，你可以轻松地实现数据验证和转换，提升应用的健壮性和安全性。
//在 main.ts 中使用 ValidationPipe，可以全局应用数据验证和转换逻辑，确保所有请求的数据都经过验证和转换处理。这有助于防止无效数据进入应用，并且可以简化控制器中的代码，使其更专注于业务逻辑。
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
