import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema'; // Importando para a referência

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, trim: true })
  name: string; // Ex: "3º Ano A - Ensino Médio"

  @Prop({ required: true })
  year: number; // Ex: 2025

  // Referência ao professor responsável pela turma.
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacherId: User;
}

export const ClassSchema = SchemaFactory.createForClass(Class);