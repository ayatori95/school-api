import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsMongoId, IsString, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['aluno', 'professor'])
  @IsNotEmpty()
  role: 'aluno' | 'professor';

  @IsMongoId()
  @IsOptional() // Opcional, pois só se aplica a alunos
  classId?: string;
}