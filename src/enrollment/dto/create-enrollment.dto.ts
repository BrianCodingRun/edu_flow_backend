import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  courseId: number;
}
