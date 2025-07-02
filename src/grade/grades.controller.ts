import { Controller, Get, Post, Body, Patch, Param, Query, NotFoundException } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  createOrUpdate(@Body() createGradeDto: CreateGradeDto) {
    // Este endpoint pode criar uma nova nota ou atualizar uma existente
    return this.gradesService.createOrUpdate(createGradeDto);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.gradesService.findByStudent(studentId);
  }

  @Get('class/:classId')
  findByClass(@Param('classId') classId: string, @Query('subject') subject: string) {
      return this.gradesService.findByClass(classId, subject);
  }
}