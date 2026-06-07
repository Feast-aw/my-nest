/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UsePipes,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Admin } from './admin.entitles';
import { storage } from './storage';
import { FileValidationPipe } from './file-validation.pipe';
import {
  SetUser,
  GetUser,
  MyHeaders,
  MyQuery,
  MyCombinedDecorator,
  MyController,
} from './custom.decorator';
import { CustomGuard } from './custom.guard';
// @Controller()
@MyController('', 'appController')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetUser('xiao', 'peng')
  @UseGuards(CustomGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @MyCombinedDecorator('hello1', 'xiao', 'peng')
  getHello1(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(
    @GetUser('name') u: string,
    @MyHeaders() header: Record<string, string>,
  ): string {
    console.log(header, 'header');
    return this.appService.getHello();
  }
  @Get('hello3')
  getHello3(@MyQuery() query: any): string {
    console.log(query.name, 'header');
    return this.appService.getHello();
  }

  @Get('admin')
  getAdminAll(): Admin[] {
    return this.appService.getAdminAll();
  }
  //单文件
  // @Post('uploads')
  // @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  // uploadFile(
  //   @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  //   @Body() body,
  // ) {
  //   console.log(file);
  //   return {
  //     message: '上传成功',
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     name: file.filename,
  //   };
  // }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        exceptionFactory: (err) => {
          throw new HttpException('五五五五' + err, 400);
        },
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log(file);
    return {
      message: '上传成功',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name: file.filename,
    };
  }

  //多文件
  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('file', 3, { dest: './uploads' }))
  uploadFiles(@UploadedFiles() file: Array<Express.Multer.File>, @Body() body) {
    console.log(file, 'file');
    return {
      message: '上传成功',
      name: file,
    };
  }

  //多文件
  @Post('uploadFiles1')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files1', maxCount: 3 },
      { name: 'files2', maxCount: 3 },
    ]),
  )
  uploadFiles1(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
    @Body() body,
  ) {
    console.log(files, 'file');
    return {
      message: '上传成功',
      name: files,
    };
  }

  //自定义文件名上传
  @Post('anyUplodFile')
  @UseInterceptors(AnyFilesInterceptor({ storage: storage }))
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(files, 'file');
    return {
      message: '上传成功',
      name: files,
    };
  }
}
