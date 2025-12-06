import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCourseDTO {
  @IsString({
    message: 'Le titre doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString({
    message: 'La description doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsString({
    message: 'Le niveau doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  level: string;

  @IsString({
    message: 'Le contenu doit être une chaine de caractère.',
  })
  @IsNotEmpty()
  @MinLength(3)
  content: string;
}
