import { IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min, IsIn } from '@nestjs/class-validator';

export class CreateGradeDto {
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;

  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsNumber()
  @IsIn([1, 2])
  semester: 1 | 2;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  value: number;
}
