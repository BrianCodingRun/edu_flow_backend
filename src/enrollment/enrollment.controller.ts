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
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // GET /enrollment - Liste toutes les inscriptions (pour ADMIN)
  @Get()
  getAllEnrollments() {
    return this.enrollmentService.getAllEnrollments();
  }

  // GET /enrollment/:id - Récupère une inscription spécifique
  @Get(':id')
  getOneEnrollment(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.getOneEnrollment(id);
  }

  // GET /enrollment/user/:userId - Toutes les inscriptions d'un utilisateur
  @Get('user/:userId')
  getUserEnrollments(@Param('userId', ParseIntPipe) userId: number) {
    return this.enrollmentService.getUserEnrollments(userId);
  }

  // GET /enrollment/course/:courseId - Toutes les inscriptions pour une formation
  @Get('course/:courseId')
  getCourseEnrollments(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.enrollmentService.getCourseEnrollments(courseId);
  }

  // POST /enrollment - Créer une nouvelle inscription (STUDENT)
  @Post()
  createEnrollment(@Body() data: CreateEnrollmentDto) {
    return this.enrollmentService.createEnrollment(data.userId, data.courseId);
  }

  // PUT /enrollment/:id/status - Approuver/Rejeter une inscription (ADMIN)
  @Put(':id/status')
  updateEnrollmentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEnrollmentStatusDto,
  ) {
    return this.enrollmentService.updateEnrollmentStatus(id, data.status);
  }

  // DELETE /enrollment/:id - Supprimer une inscription
  @Delete(':id')
  deleteEnrollment(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.deleteEnrollment(id);
  }

  // GET /enrollment/pending - Liste des inscriptions en attente (ADMIN)
  @Get('status/pending')
  getPendingEnrollments() {
    return this.enrollmentService.getEnrollmentsByStatus('PENDING');
  }

  // GET /enrollment/approved - Liste des inscriptions approuvées
  @Get('status/approved')
  getApprovedEnrollments() {
    return this.enrollmentService.getEnrollmentsByStatus('APPROVED');
  }
}
