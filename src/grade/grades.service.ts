import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from './schemas/grade.schema';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<GradeDocument>) {}

  // Lógica para criar ou atualizar uma nota, para evitar duplicatas.
  async createOrUpdate(createGradeDto: CreateGradeDto): Promise<Grade> {
    const { studentId, subject, semester, year } = createGradeDto;
    
    const existingGrade = await this.gradeModel.findOneAndUpdate(
        { studentId, subject, semester, year }, // Critério de busca
        { value: createGradeDto.value, classId: createGradeDto.classId }, // Dados para atualizar ou inserir
        { new: true, upsert: true } // Opções: retorna o novo doc, e cria se não existir (upsert)
    ).exec();

    return existingGrade;
  }

  async findByStudent(studentId: string): Promise<Grade[]> {
    return this.gradeModel.find({ studentId }).exec();
  }

  async findByClass(classId: string, subject?: string): Promise<Grade[]> {
      const query: any = { classId };
      if (subject) {
          query.subject = subject;
      }
      return this.gradeModel.find(query).populate('studentId', 'name').exec();
  }
}