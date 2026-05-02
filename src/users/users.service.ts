import { Injectable } from '@nestjs/common';
import { CreateUserDto, updeteUserDto } from './dot/create-user.dto';
@Injectable()
export class UsersService {
  getUser(id: string): string {
    console.log(id);
    return 'User';
  }
  cereateUser(CreateUserDto: CreateUserDto): string {
    console.log(CreateUserDto, 'createUser');
    return 'Create User' + CreateUserDto.name + ' ' + CreateUserDto.age + ' ' + CreateUserDto.email;
  }
  deteteUser(id: string): string {
    return 'Delete User with id: ' + id;
  }
  updateUser(updeteUserDto: updeteUserDto): string {
    console.log(updeteUserDto, 'updateUser');
    return 'Update User';
  }
}
