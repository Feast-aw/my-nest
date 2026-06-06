import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
// import { PersonGuard } from './person/person.guard';
// import { TimeoutInterceptor } from './timeout/timeout.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  // app.useGlobalGuards(app.get(PersonGuard));
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
