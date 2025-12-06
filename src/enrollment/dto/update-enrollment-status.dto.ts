import { IsEnum, IsNotEmpty } from 'class-validator';
import { EnrollmentStatus } from 'src/generated/prisma/client';

export class UpdateEnrollmentStatusDto {
  @IsEnum(EnrollmentStatus)
  @IsNotEmpty()
  status!: EnrollmentStatus;
}
