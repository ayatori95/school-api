import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { classId, date, students } = createAttendanceDto;
    const dateObj = new Date(date);

    // Usa bulkWrite para uma operação mais eficiente no banco
    const operations = students.map(student => ({
        updateOne: {
            filter: { studentId: student.studentId, classId, date: dateObj },
            update: { $set: { status: student.status } },
            upsert: true
        }
    }));

    const result = await this.attendanceModel.bulkWrite(operations);
    return { message: `${result.upsertedCount + result.modifiedCount} registros de presença processados.` };
  }

  async find(query: { studentId?: string; classId?: string; month?: string; year?: string }): Promise<Attendance[]> {
    const filter: any = {};
    if (query.studentId) filter.studentId = query.studentId;
    if (query.classId) filter.classId = query.classId;

    if (query.month && query.year) {
        const year = parseInt(query.year);
        const month = parseInt(query.month) - 1; // Mês no JS é 0-indexado
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        filter.date = { $gte: startDate, $lte: endDate };
    }

    return this.attendanceModel.find(filter).exec();
  }
}