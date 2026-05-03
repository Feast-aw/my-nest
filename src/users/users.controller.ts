import { Controller, Get, Post, Delete, Param, Query, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, updeteUserDto } from './dto/user-request.dot';
import { UserResponseDto } from './dto/user-response.dto';
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}
  @Get(':id')
  getuser(@Param('id') id: number): Promise<UserResponseDto> {
    return this.users.getUser(id);
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.users.cereateUser(CreateUserDto);
  }
  @Delete()
  // @HttpCode(204) // 设置 HTTP 状态码为 204 No Content，表示删除成功但没有返回内容。
  deleteUser(@Query('id') id: number): Promise<string> {
    return this.users.deteteUser(id);
  }
  @Put()
  updateUser(@Body() updeteUserDto: updeteUserDto): Promise<UserResponseDto> {
    return this.users.updateUser(updeteUserDto);
  }
  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.users.findAll();
  }
}
