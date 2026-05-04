import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
//PassportStrategy 是一个抽象类，提供了一个基础结构来实现各种认证策略。
// 通过继承 PassportStrategy，我们可以创建一个自定义的 JWT 策略来处理 JWT 认证逻辑。

//ExtractJwt 是 passport-jwt 提供的一个工具类，用于从请求中提取 JWT。
// 我们在这里使用 fromAuthHeaderAsBearerToken() 方法来指定从请求头中的 Bearer token 提取 JWT。

//Strategy 是 passport-jwt 提供的一个策略类，用于验证 JWT 的有效性。
// 我们在 JwtStrategy 中配置了 JWT 的提取方式、过期时间处理以及 secret key。
interface JwtPayload {
  sub: number | string;
  username?: string;
  iat?: number;
  exp?: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      ignoreExpiration: false, // 不忽略 token 过期
      secretOrKey: 'your_jwt_secret', // 这里应该使用环境变量来存储 secret
    });
  }
  // validate 方法是 PassportStrategy 中定义的一个抽象方法，必须在子类中实现。
  // 当 JWT 验证成功后，Passport 会调用 validate 方法，并将解码后的 JWT payload 作为参数传入。
  async validate(payload: JwtPayload) {
    console.log('JWT payload:', payload);
    // payload 包含 jwt.sign 时传入的数据
    const user = await this.userRepository.findOne({ where: { id: payload.sub as number } });
    if (!user) {
      throw new UnauthorizedException(); // 如果用户不存在，抛出未授权异常
    }
    return { id: user.id, username: user.username }; // 挂载到 request.user
  }
}
