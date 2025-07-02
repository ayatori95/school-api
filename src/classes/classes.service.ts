import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { User, UserDocument } from '../users/schemas/user.schema'; // Importar User
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  // Injetamos ambos os models para fazer a validação
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    // Verifica se o professor existe e se tem o role 'professor'
    const teacher = await this.userModel.findById(createClassDto.teacherId).exec();
    if (!teacher || teacher.role !== 'professor') {
        throw new BadRequestException('ID de professor inválido ou usuário não é um professor.');
    }
    
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  async findAll(): Promise<Class[]> {
    // .populate() substitui o ID do professor pelos dados completos do documento do professor
    return this.classModel.find().populate('teacherId', '-password').exec();
  }

  async findOne(id: string): Promise<Class> {
    return this.classModel.findById(id).populate('teacherId', '-password').exec();
  }
  
  async findStudentsByClass(classId: string): Promise<User[]> {
      const classExists = await this.classModel.findById(classId);
      if (!classExists) {
        throw new NotFoundException(`Turma com ID ${classId} não encontrada.`);
      }
      return this.userModel.find({ classId: classId, role: 'aluno' }).select('-password').exec();
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const updatedClass = await this.classModel
      .findByIdAndUpdate(id, updateClassDto, { new: true })
      .exec();
    
    if (!updatedClass) {
        throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }
    return updatedClass;
  }

  async remove(id: string) {
    const result = await this.classModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }
    return { message: 'Turma removida com sucesso.' };
  }
}