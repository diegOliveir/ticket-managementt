import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite requisições apenas de localhost:3001
    methods: '*',  // Define os métodos permitidos
    allowedHeaders: '*', // Cabeçalhos permitidos
  });
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
