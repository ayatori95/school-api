import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class, ClassSchema } from './schemas/class.schema';
import { User, UserSchema } from '../users/schemas/user.schema'; // Importar dependência

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema } // Registrar User model aqui
    ])
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}