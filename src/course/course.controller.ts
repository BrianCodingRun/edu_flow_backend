import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/all')
  getCourses() {
    return this.courseService.getAllCourses();
  }

  @Get('/:id')
  getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getOneCourse(id);
  }

  @Post('/create')
  createCourse(@Body() data: CreateCourseDTO) {
    return this.courseService.createCourse(data);
  }

  @Put('/:id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCourseDTO,
  ) {
    return this.courseService.updateCourse(id, data);
  }

  @Delete('/:id')
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteCourse(id);
  }
}
