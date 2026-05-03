import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dto';
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private async findIsUserExist(userId: number): Promise<User> {
    const find = await this.userRepository.findOneBy({ id: userId });
    if (!find) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return find;
  }

  // 创建待办（关联当前用户）
  async create(todo: CreateTodoDto): Promise<Todo> {
    const { userId } = todo;
    await this.findIsUserExist(userId);
    const newTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(newTodo);
  }

  // 获取当前用户的所有待办
  async findAll(userId: number): Promise<Todo[]> {
    await this.findIsUserExist(userId);
    return this.todoRepository.findBy({ userId });
  }

  // 获取单个待办
  async findOne(id: number, userId: number): Promise<Todo> {
    const find = await this.todoRepository.findOneBy({ id: userId });
    if (!find) {
      throw new HttpException('待办事项不存在', HttpStatus.BAD_REQUEST);
    }
    return find;
  }

  // 更新待办
  async update(id: number, userId: number, updateData: UpdateTodoDto): Promise<Todo> {
    const find = await this.todoRepository.findOneBy({ id, userId });
    if (!find) {
      throw new HttpException('待办事项不存在', HttpStatus.BAD_REQUEST);
    }
    Object.assign(find, updateData);
    return this.todoRepository.save(find);
  }

  // 删除待办
  async remove(id: number, userId: number): Promise<void> {
    const result = await this.todoRepository.delete({ id, userId });
    //affected
    if (!result.affected) {
      throw new HttpException('待办事项不存在', HttpStatus.BAD_REQUEST);
    }
  }
}
