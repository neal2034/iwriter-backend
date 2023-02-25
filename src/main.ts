import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.enableCors()
  await app.listen(port);
}
bootstrap();
