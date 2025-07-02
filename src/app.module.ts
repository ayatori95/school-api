// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importe aqui os outros módulos da sua aplicação (UsersModule, etc.)

@Module({
  imports: [
    // 1. Configure a conexão com o MongoDB aqui
    MongooseModule.forRoot('mongodb+srv://lorenacristinaac:9s0vIwigJAiyhHzo@cluster0.orjkjrs.mongodb.net/escola'),
    
    // 2. Adicione os outros módulos aqui depois
    // UsersModule,
    // ClassesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
