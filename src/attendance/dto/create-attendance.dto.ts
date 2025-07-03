import { Type } from '@nestjs/class-transformer';
import { IsMongoId, IsNotEmpty, IsString, IsEnum, IsDateString, ValidateNested, IsArray } from '@nestjs/class-validator';

class StudentAttendanceDto {
    @IsMongoId()
    studentId: string;

    @IsEnum(['presente', 'ausente'])
    status: 'presente' | 'ausente';
}

export class CreateAttendanceDto {
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceDto)
  students: StudentAttendanceDto[];
}