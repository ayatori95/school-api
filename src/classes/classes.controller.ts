import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('professor') // Apenas professores podem criar turmas
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @Roles('professor', 'admin') // Exemplo: apenas professores ou admins podem ver todas as turmas
  findAll() {
    return this.classesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }

  @Get('teacher/me')
  @Roles('professor') // Apenas professores podem acessar
  findMyClasses(@Request() req) {
    // req.user.userId é injetado pelo JwtStrategy
    return this.classesService.findByTeacher(req.user.userId);
  }

  @Get(':id/students')
  @Roles('professor')
  findStudentsByClass(@Param('id') id: string) {
    // Opcional: Adicionar lógica no service para verificar se o professor logado
    // realmente é o professor desta turma antes de retornar os alunos.
    return this.classesService.findStudentsByClass(id);
  }

  @Get(':id')
  @Roles('professor', 'admin')
  async findOne(@Param('id') id: string) {
    const classFound = await this.classesService.findOne(id);
    if (!classFound) {
        throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }
    return classFound;
  }
}