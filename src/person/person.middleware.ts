import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PersonService } from './person.service';
@Injectable()
export class PersonMiddleware implements NestMiddleware {
  @Inject(PersonService)
  private personService: PersonService;
  use(req: Request, res: Response, next: NextFunction) {
    console.log('befrore...  进入了局部中间件' + req.url);
    console.log('调用注入的服务 ---' + this.personService.findAll());
    next();
    console.log('after...  离开了局部件' + res.statusCode);
  }
}
