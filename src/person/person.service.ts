import { Injectable, Inject } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class PersonService {
  // constructor(private readonly userService: UserService) {}
  @Inject(UserService)
  private readonly userService!: UserService;

  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findAll() {
    const users = this.userService.findAll();
    return `This action returns all person and users: ${users}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
