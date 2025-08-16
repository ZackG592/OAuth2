import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap();
