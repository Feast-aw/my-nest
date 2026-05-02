// dot 是 Data Transfer Object 的缩写，表示数据传输对象。
// 它是一种设计模式，用于在不同层之间传递数据。在 NestJS 中，
// DTO 通常用于定义请求体的数据结构，以确保数据的有效性和类型安全。

// 在 NestJS 中，DTO 通常是一个简单的类，包含属性和类型定义。
// 它可以使用装饰器来验证数据，例如使用 class-validator
// 库中的装饰器来验证请求体中的数据是否符合预期的格式和要求。

//class-transformer 是一个用于在 JavaScript 和 TypeScript 中进行对象转换的库。
// 它提供了一些装饰器和函数，可以帮助你将普通的 JavaScript 对象转换为类实例，
// 或者将类实例转换为普通对象。这对于在 NestJS 中使用 DTO（数据传输对象）非常有用，
// 因为它可以自动将请求体转换为 DTO 类实例，从而简化了数据验证和处理的过程。
// 例如，在 DTO 类中使用 @Type() 装饰器可以指定属性的类型，以便在转换过程中正确地处理嵌套对象或数组。

import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsEmail,
  Min,
  Max,
  IsOptional,
  ValidateNested,
  IsDefined,
} from 'class-validator';
class ProfileDto {
  @IsString()
  bio: string;
}
export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  @Type(() => Number) // 这个装饰器告诉 class-transformer 在转换时把这个属性转换为数字类型
  age: number;

  @IsEmail()
  email: string;

  @IsDefined() // 这个装饰器表示这个属性必须传，在创建用户时必须提供这个字段
  @ValidateNested() // 这个装饰器告诉 class-validator 验证这个属性时也要验证它的子属性
  @Type(() => ProfileDto) // 这个装饰器告诉 class-transformer 在转换时把这个属性转换为 ProfileDto 类的实例
  profile: ProfileDto;
}

export class updeteUserDto {
  @IsString()
  @IsOptional() // 这个装饰器表示这个属性是可选的，在更新用户时可以不提供这个字段
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  @Type(() => Number)
  @IsOptional() // 这个装饰器表示这个属性是可选的，在更新用户时可以不提供这个字段
  age: number;

  @IsEmail()
  @IsOptional() // 这个装饰器表示这个属性是可选的，在更新用户时可以不提供这个字段
  email: string;
}
