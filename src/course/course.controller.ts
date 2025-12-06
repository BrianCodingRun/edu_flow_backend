import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/generated/prisma/enums';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  getCourses() {
    return this.courseService.getAllCourses();
  }

  @Get('/:id')
  getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getOneCourse(id);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  createCourse(@Body() data: CreateCourseDTO) {
    return this.courseService.createCourse(data);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCourseDTO,
  ) {
    return this.courseService.updateCourse(id, data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteCourse(id);
  }
}
