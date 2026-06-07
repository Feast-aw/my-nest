import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
  Get,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomGuard } from './custom.guard';
export const SetUser = (...args: string[]) => SetMetadata('SetUser', args);

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log(data, 'data');
    return request.query[data];
  },
);

export const MyHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return data ? request.query[data] : request.query;
  },
);

//合并多个装饰器
export function MyCombinedDecorator(path: string, ...user: string[]) {
  return applyDecorators(Get(path), SetUser(...user), UseGuards(CustomGuard));
}

export function MyController(path: string, metaData: string) {
  return applyDecorators(Controller(path), SetMetadata('MyClass', metaData));
}
