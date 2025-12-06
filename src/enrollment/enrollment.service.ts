import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnrollmentStatus } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Récupérer toutes les inscriptions
  async getAllEnrollments() {
    return this.prisma.enrollment.findMany({
      include: {
        user: {
          select: { id: true, email: true, pseudo: true, role: true },
        },
        course: {
          select: { id: true, title: true, level: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Récupérer une inscription par ID
  async getOneEnrollment(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, pseudo: true, role: true },
        },
        course: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException("Aucune inscription n'existe avec cet ID");
    }

    return enrollment;
  }

  // Récupérer toutes les inscriptions d'un utilisateur
  async getUserEnrollments(userId: number) {
    // Vérifier que l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas");
    }

    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Récupérer toutes les inscriptions pour une formation
  async getCourseEnrollments(courseId: number) {
    // Vérifier que la formation existe
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException("Cette formation n'existe pas");
    }

    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: {
        user: {
          select: { id: true, email: true, pseudo: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Créer une nouvelle inscription
  async createEnrollment(userId: number, courseId: number) {
    // Vérifier que l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas");
    }

    // Vérifier que la formation existe
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException("Cette formation n'existe pas");
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existingEnrollment) {
      throw new BadRequestException('Vous êtes déjà inscrit à cette formation');
    }

    // Créer l'inscription avec statut PENDING
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'PENDING',
      },
      include: {
        course: true,
        user: {
          select: { id: true, email: true, pseudo: true },
        },
      },
    });
  }

  // Mettre à jour le statut d'une inscription (ADMIN approuve/rejette)
  async updateEnrollmentStatus(id: number, status: EnrollmentStatus) {
    // Vérifier que l'inscription existe
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException("Cette inscription n'existe pas");
    }

    // Vérifier que le statut est valide
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      throw new BadRequestException('Statut invalide');
    }

    return this.prisma.enrollment.update({
      where: { id },
      data: { status },
      include: {
        course: true,
        user: {
          select: { id: true, email: true, pseudo: true },
        },
      },
    });
  }

  // Supprimer une inscription
  async deleteEnrollment(id: number) {
    // Vérifier que l'inscription existe
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException("Cette inscription n'existe pas");
    }

    return this.prisma.enrollment.delete({
      where: { id },
    });
  }

  // Récupérer les inscriptions par statut
  async getEnrollmentsByStatus(status: EnrollmentStatus) {
    return this.prisma.enrollment.findMany({
      where: { status },
      include: {
        user: {
          select: { id: true, email: true, pseudo: true },
        },
        course: {
          select: { id: true, title: true, level: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
