import { Controller, Get, Post, Body, Patch, Param, Query, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('aluno') // Apenas usuários com a role 'aluno' podem acessar
  @Get('my-grades')
  findMyGrades(@Request() req) {
    // req.user.userId vem do payload do token JWT
    return this.gradesService.findByStudent(req.user.userId);
  }
}