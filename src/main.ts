import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite requisições apenas de localhost:3001
    methods: '*',  // Define os métodos permitidos
    allowedHeaders: '*', // Cabeçalhos permitidos
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Isso transforma os dados para o tipo especificado no DTO
    whitelist: true, // Ignora propriedades extras não definidas no DTO
    forbidNonWhitelisted: true, // Retorna um erro se encontrar propriedades não autorizadas
  }));
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
