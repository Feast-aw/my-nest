import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PersonService } from './person.service';
@Injectable()
export class PersonGuard implements CanActivate {
  @Inject(PersonService)
  private personService: PersonService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入了守卫', this.personService.findAll());
    return true;
  }
}
