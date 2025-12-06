import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCourseDTO {
  @IsString({
    message: 'Le titre doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  title: string;

  @IsString({
    message: 'La description doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  description: string;

  @IsString({
    message: 'Le niveau doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  level: string;

  @IsString({
    message: 'Le contenu doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  content: string;
}
