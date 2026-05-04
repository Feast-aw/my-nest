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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dto';
//UseGuards 是 NestJS 提供的一个装饰器，用于将守卫应用于控制器或路由处理程序。守卫是一种特殊的类，
// 用于在请求进入路由处理程序之前进行认证、授权或其他预处理逻辑。
// 当你在控制器或路由处理程序上使用 @UseGuards(AuthGuard) 时，NestJS 会在请求进入该路由处理程序之前执行 AuthGuard 中定义的认证逻辑。
// 如果认证成功，AuthGuard 会允许请求继续执行路由处理程序；如果认证失败，AuthGuard 会抛出一个异常（通常是 UnauthorizedException），
// 并返回一个 401 Unauthorized 响应给客户端。
@Controller('todos')
@UseGuards(AuthGuard) // 应用 AuthGuard 进行 JWT 认证
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
