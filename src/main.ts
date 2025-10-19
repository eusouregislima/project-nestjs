import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // coloca erro se alguma propriedade não estiver no DTO
      transform: false, // tenta transformar o payload para o tipo do DTO
    }),
    new ParseIntIdPipe(), // pipe global para transformar o id para number
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
