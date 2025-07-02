import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Class } from '../../classes/schemas/class.schema'; // Importando para a referência

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // timestamps adiciona createdAt e updatedAt
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string; // Lembre-se que este valor deve ser um hash

  @Prop({ required: true, enum: ['aluno', 'professor'] })
  role: string;

  // Este campo só é relevante para alunos.
  // Ele cria uma referência à coleção 'classes'.
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false })
  classId?: Class;
}

export const UserSchema = SchemaFactory.createForClass(User);