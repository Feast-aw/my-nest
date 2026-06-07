import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'car',
      useValue: {
        brand: 'BYD',
        price: 100000,
      },
    },
  ],
})
export class UserModule {}
