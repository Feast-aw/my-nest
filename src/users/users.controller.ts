import { Controller, Get, Post, Delete, Param, Query, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, updeteUserDto } from './dot/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}
  @Get(':id')
  getuser(@Param('id') id: string): string {
    return this.users.getUser(id);
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): string {
    return this.users.cereateUser(CreateUserDto);
  }
  @Delete()
  deleteUser(@Query('id') id: string): string {
    return this.users.deteteUser(id);
  }
  @Put()
  updateUser(@Body() updeteUserDto: updeteUserDto): string {
    return this.users.updateUser(updeteUserDto);
  }
}
