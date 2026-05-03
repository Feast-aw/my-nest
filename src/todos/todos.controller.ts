import {
  Controller,
  Post,
  Put,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dto';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  // 辅助方法：从请求头获取用户ID
  private getUserIdFromHeaders(headers: Record<string, string>): number {
    const userId = headers['user-id'];
    if (!userId) {
      throw new HttpException('用户ID缺失', HttpStatus.BAD_REQUEST);
    }
    return parseInt(userId);
  }

  @Post()
  create(@Headers() headers: Record<string, string>, @Body() createTodoDto: CreateTodoDto) {
    const userId = this.getUserIdFromHeaders(headers);
    return this.todosService.create({ ...createTodoDto, userId });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Headers() headers: Record<string, string>,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    const userId = this.getUserIdFromHeaders(headers);
    return this.todosService.update(id, userId, updateTodoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Headers() headers: Record<string, string>) {
    const userId = this.getUserIdFromHeaders(headers);
    return this.todosService.findOne(id, userId);
  }

  @Get()
  findAll(@Headers() headers: Record<string, string>) {
    const userId = this.getUserIdFromHeaders(headers);
    return this.todosService.findAll(userId);
  }

  @Delete(':id')
  @HttpCode(204) // 设置 HTTP 状态码为 204 No Content，表示删除成功但没有返回内容。
  remove(@Param('id') id: number, @Headers() headers: Record<string, string>) {
    const userId = this.getUserIdFromHeaders(headers);
    return this.todosService.remove(id, userId);
  }
}
