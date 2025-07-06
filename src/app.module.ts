import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ClassesModule } from './classes/classes.module';
import { GradesModule } from './grade/grades.module';
import { AttendancesModule } from './attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    //Configura o MongooseModule de forma assíncrona
    // Usamos `forRootAsync` porque precisamos que o `ConfigModule` seja carregado ANTES
    // de tentarmos obter a string de conexão.
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule para este contexto
      inject: [ConfigService],  // Injeta o ConfigService para que possamos usá-lo
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Pega a variável do .env
      }),
    }),

    UsersModule,
    ClassesModule,
    GradesModule,
    AttendancesModule,
    AppModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
