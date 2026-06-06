import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthInterceptor } from './auth.interceptor';
import { from } from 'rxjs';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CONFIG_OPTIONS') private readonly optionst: Record<string, any>,
  ) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    console.log(this.optionst, 'optionst');
    return this.authService.findAll();
  }
  @Get('name')
  @UseInterceptors(AuthInterceptor)
  findName() {
    console.log('进入name---');
    return from(['hello', 'worldA', 'abc']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
