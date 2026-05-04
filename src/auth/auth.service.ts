import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
//HttpException 是 NestJS 提供的一个内置异常类，用于在应用程序中抛出 HTTP 错误。
// 当你需要返回一个特定的 HTTP 状态码和错误消息时，可以使用 HttpException 来实现。
// 它接受两个参数：错误消息和 HTTP 状态码。
// 例如，HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
// 将返回一个 400 Bad Request 错误，并附带消息 "用户名已存在"。
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  //注册功能
  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { username, password } = registerDto;
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOneBy({ username });
    if (existingUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    // 加密密码 bcrypt.hash 函数接受两个参数：要加密的密码（password）
    // 和一个盐值（saltRounds）。盐值是一个整数，
    // 表示在加密过程中使用的随机数据的复杂程度。
    // 通常，盐值越大，加密过程就越复杂，生成的哈希值也就越安全。
    // 常见的盐值是 10，这意味着 bcrypt 将进行 2^10 次迭代来加密密码，
    // 从而增加了破解密码的难度。
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建新用户
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    const saved = await this.userRepository.save(newUser);
    return plainToInstance(UserResponseDto, saved, { excludeExtraneousValues: true });
  }

  // 登录功能
  async login(registerDto: RegisterDto): Promise<{ access_token: string; user: UserResponseDto }> {
    const { username, password } = registerDto;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    // 生成 JWT token
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    const userDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    return {
      access_token: token,
      user: userDto,
    };
  }
}
