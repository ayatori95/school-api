import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const classFound = await this.classesService.findOne(id);
    if (!classFound) {
        throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }
    return classFound;
  }
  
  @Get(':id/students')
  findStudentsByClass(@Param('id') id: string) {
    return this.classesService.findStudentsByClass(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}