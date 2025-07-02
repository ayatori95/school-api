import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Class } from '../../classes/schemas/class.schema';

export type GradeDocument = HydratedDocument<Grade>;

@Schema({ timestamps: true })
export class Grade {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  studentId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
  classId: Class;

  @Prop({ required: true, trim: true })
  subject: string; // Ex: "Matemática"

  @Prop({ required: true, enum: [1, 2] })
  semester: number; // 1º ou 2º semestre

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, min: 0, max: 10 })
  value: number; // A nota em si
}

export const GradeSchema = SchemaFactory.createForClass(Grade);