import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
//JwtModule 和 PassportModule 是实现 JWT 认证的核心模块，
//JwtModule 用于配置 JWT 的相关选项（如 secret 和过期时间），
// 而 PassportModule 则提供了认证框架的基础设施，允许我们定义和使用各种认证策略（如 JWT 策略）。
//TypeOrmModule.forFeature([User]) 则是为了在 AuthService 中使用 User 实体进行数据库操作。
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // 这里应该使用环境变量来存储 secret
      signOptions: { expiresIn: '1h' }, // token 过期时间
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule], // 导出 AuthService 以便在其他模块中使用
})
export class AuthModule {}
