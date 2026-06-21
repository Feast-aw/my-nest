// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// @Injectable()
// export class UserService {
//   @InjectRepository(User)
//   private userRepository!: Repository<User>;

//   async create(createUserDto: CreateUserDto) {
//     const user = await this.userRepository.save(createUserDto);
//     console.log(user);
//     return user;
//   }
// Repostioty
//   async findAll() {
//     return await this.userRepository.find();
//   }

//   async findOne(id: number) {
//     return await this.userRepository.findOneBy({ id });
//   }

//   async update(id: number, updateUserDto: UpdateUserDto) {
//     return await this.userRepository.save({ id, ...updateUserDto });
//   }

//   async remove(id: number) {
//     return await this.userRepository.delete({ id });
//   }
// }
