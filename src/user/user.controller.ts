import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Ip,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService!: UserService;
  @Inject('car')
  private car!: { brand: string; price: number };
  // constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    // return this.userService.findAll();
    return this.car;
  }
  @Get('other')
  other(
    @Ip() ip: string,
    @Headers() headers: Record<string, string>,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(ip);
    console.log(headers);
    console.log(req.url);
    // return `this is other api`;
    res.send('this is other api');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
