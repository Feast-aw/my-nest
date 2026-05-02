import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入 TypeOrmModule，并注册 User 实体，以便在 UsersService 中使用 Repository 来操作 User 实体对应的数据库表。
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // 导出 UsersService，使其可以在其他模块中被导入和使用。
})
export class UsersModule {}
