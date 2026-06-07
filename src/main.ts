import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseIntPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ParseIntPipe());
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
