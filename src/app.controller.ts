import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//Controller 是 Nest.js 中的一个装饰器，用于定义一个控制器类。
// 控制器负责处理传入的 HTTP 请求，并返回响应。
// 通过使用 @Controller() 装饰器，
// 你可以指定这个控制器处理的路由路径。
// 例如，@Controller('users') 表示这个控制器将处理以 /users 开头的请求。

//Get 装饰器用于处理 HTTP GET 请求，Post 装饰器用于处理 HTTP POST 请求，
// Delete 装饰器用于处理 HTTP DELETE 请求，Put 装饰器用于处理 HTTP PUT 请求。
// Param 装饰器用于获取 URL 中的参数，Query 装饰器用于获取查询参数，
// Body 装饰器用于获取请求体中的数据。
@Controller('users')
export class AppController {
  constructor(private appService: AppService) {}
  @Get(':id')
  getHello(): string {
    return this.appService.getHello();
  }
}
