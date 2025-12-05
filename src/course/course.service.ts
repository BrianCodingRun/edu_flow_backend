import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCourses() {
    return this.prisma.course.findMany();
  }

  async getOneCourse(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException("Aucune formation n'existe avec cette id!");
    }

    return course;
  }

  async createCourse(data) {
    // const courseExisting = await this.prisma.course.findUnique({
    //   where: { name: data.name },
    // });

    // if (courseExisting) {
    //   throw new BadRequestException(
    //     'Cette formation existe déjà, veuillez en choisir une autre !',
    //   );
    // }

    return this.prisma.course.create({
      data,
    });
  }

  async updateCourse(id: number, data) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException("Aucune formation n'existe avec cette id!");
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async deleteCourse(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException("Aucune formation n'existe avec cette id!");
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
