import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import cookieSession from 'cookie-session';

async function bootstrap() {
  // initialize app using nest factory
  const app = await NestFactory.create(AppModule);

  // set global prefix
  app.setGlobalPrefix('api');

  // cookie session
  app.use(
    cookieSession({
      keys: ['aisfpoghyertsdf'], // used to encrypt the cookie string
    }),
  );

  // global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to get only valid specified fields
    }),
  );

  // start server with listening port
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
