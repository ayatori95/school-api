import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importe aqui

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione esta linha para habilitar a validação global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
