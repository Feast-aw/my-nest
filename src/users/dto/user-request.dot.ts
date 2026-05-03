import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class updeteUserDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  password: string;
}
