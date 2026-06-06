import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
// import { UserModule } from '../user/user.module';
import { PersonMiddleware } from './person.middleware';
@Module({
  // imports: [UserModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(PersonMiddleware).forRoutes('person');
    //指定特定的路由：
    consumer.apply(PersonMiddleware).forRoutes({
      path: 'person',
      method: RequestMethod.GET,
    });
  }
}
