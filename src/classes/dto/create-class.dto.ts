import { IsNotEmpty, IsNumber, IsString, IsMongoId } from '@nestjs/class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsMongoId() // Valida se é um ObjectId válido do MongoDB
  @IsNotEmpty()
  teacherId: string;
}