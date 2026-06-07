import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ValidatePipe } from '../validate.pipe';
import { MyExceptionFilter } from 'src/my-exception.filter';
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  // @Get(':id')
  // @UsePipes(ValidatePipe)
  // findOne(@Param('id') id: string) {
  //   return this.personService.findOne(+id);
  // }
  // @Get(':id')
  // findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: string,
  // ) {
  //   return this.personService.findOne(+id);
  // }
  @Get(':id')
  @UseFilters(MyExceptionFilter)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (error: string) => {
          throw new HttpException('参数id类型错误', HttpStatus.BAD_REQUEST);
        },
      }),
    )
    id: string,
  ) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
