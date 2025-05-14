import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as swaggerUi from 'swagger-ui-express';
import {swaggerDoc} from './swagger'
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors();
  app.use(cookieParser());
  const specs = swaggerDoc()
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  await app.listen(process.env.PORT || 3000);
  console.log("Docs available at this url: " + await app.getUrl() + "/api-docs")
}
bootstrap();
