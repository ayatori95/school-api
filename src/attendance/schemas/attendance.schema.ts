import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Class } from '../../classes/schemas/class.schema';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  studentId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
  classId: Class;

  @Prop({ required: true })
  date: Date; // Armazena a data completa da aula

  @Prop({ required: true, enum: ['presente', 'ausente'] })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);