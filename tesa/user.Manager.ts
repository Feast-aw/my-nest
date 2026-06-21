// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectEntityManager } from '@nestjs/typeorm';
// import { EntityManager } from 'typeorm';
// import { User } from './entities/user.entity';
// @Injectable()
// export class UserService {
//   @InjectEntityManager()
//   private entityManager!: EntityManager;

//   async create(createUserDto: CreateUserDto) {
//     const user = await this.entityManager.save(User, createUserDto);
//     console.log(user);
//     return user;
//   }

//   async findAll() {
//     return await this.entityManager.find(User);
//   }

//   async findOne(id: number) {
//     return await this.entityManager.findOneBy(User, { id });
//   }

//   async update(id: number, updateUserDto: UpdateUserDto) {
//     return await this.entityManager.save(User, { id, ...updateUserDto });
//   }

//   async remove(id: number) {
//     return await this.entityManager.delete(User, { id });
//   }
// }
