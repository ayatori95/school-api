import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AttendancesService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    // Cria múltiplos registros de uma vez
    return this.attendancesService.create(createAttendanceDto);
  }

  @Get()
  find(
    @Query('studentId') studentId?: string,
    @Query('classId') classId?: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    return this.attendancesService.find({ studentId, classId, month, year });
  }
}