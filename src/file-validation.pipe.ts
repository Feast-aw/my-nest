import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.size > 1024 * 1024 * 1024) {
      console.log(value.size);
      throw new HttpException(
        '文件内容大小超过10*1024',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
