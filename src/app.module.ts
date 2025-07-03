import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ClassesModule } from './classes/classes.module';
import { GradesModule } from './grade/grades.module';
import { AttendancesModule } from './attendance/attendance.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lorenacristinaac:9s0vIwigJAiyhHzo@cluster0.orjkjrs.mongodb.net/escola'),
    UsersModule,
    ClassesModule,
    GradesModule,
    AttendancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
