import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto, updeteUserDto } from './dto/user-request.dot';
import { UserResponseDto } from './dto/user-response.dto';
//InjectRepository 是 TypeORM 提供的一个装饰器，
// 用于在 Nest.js 中注入一个特定实体的 Repository。
// Repository 是 TypeORM 中用于执行数据库操作的类，
// 使用 InjectRepository(User) 可以将 User 实体的 Repository 注入到 UsersService 中，
@Injectable()
export class UsersService {
  constructor(
    // 使用 @InjectRepository(User) 装饰器将 User 实体的 Repository 注入到 UsersService 中。
    @InjectRepository(User)
    // 定义一个私有属性 userRepository，类型为 Repository<User>，用于在 UsersService 中执行与 User 实体相关的数据库操作。
    private userRepository: Repository<User>
  ) {}

  async cereateUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto); // 使用 Repository 的 create 方法创建一个新的 User 实体实例，并将 CreateUserDto 中的数据传递给它。
    const saved = await this.userRepository.save(user); // 保存到数据库并得到完整实体（含敏感或元数据字段）
    // 使用 class-transformer 将实体转换为响应 DTO，并排除未标记的字段
    // plainToInstance 函数接受三个参数：要转换成的类（UserResponseDto）、
    // 要转换的对象（saved），以及一个选项对象。在选项对象中，
    // excludeExtraneousValues: true 表示在转换过程中排除那些没有在 UserResponseDto 中使用 @Expose() 装饰器标记的字段。
    return plainToInstance(UserResponseDto, saved, { excludeExtraneousValues: true });
  }
  async updateUser(updeteUserDto: updeteUserDto): Promise<UserResponseDto> {
    const finduser = await this.userRepository.findOneBy({ id: updeteUserDto.id }); // 使用 Repository 的 findOneBy 方法根据 ID 查找用户实体。
    if (!finduser) {
      throw new Error('User not found');
    }
    const updatedUser = this.userRepository.merge(finduser, updeteUserDto); // 使用 Repository 的 merge 方法将 finduser 实体与 updeteUserDto 中的数据合并，得到一个新的 User 实体实例。
    const saved = await this.userRepository.save(updatedUser); // 将合并后的实体保存到数据库中，并得到完整的实体对象（包含敏感或元数据字段）。
    return plainToInstance(UserResponseDto, saved, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true })
    );
  }

  async getUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }
  async deteteUser(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return `User with id ${id} not found.`;
    }
    return `User with id ${id} has been deleted.`;
  }
}
