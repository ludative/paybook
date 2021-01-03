import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'body-parser';
import {ValidationPipe} from "@nestjs/common";

const setSwaggerModule = (app: NestExpressApplication): void => {
  const options = new DocumentBuilder()
      .setTitle('가계부 API')
      .setDescription('가계부 API 명세서 입니다. 끼룩 🐥')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
};

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const PORT = 5000;

  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.useGlobalPipes(new ValidationPipe());

  setSwaggerModule(app);

  await app.listen(PORT);
  console.log(`Server is Running port: ${PORT} 🚀`)
}
bootstrap();
