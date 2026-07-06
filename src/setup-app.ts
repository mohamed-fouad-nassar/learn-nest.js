import cookieSession from 'cookie-session';
import { INestApplication, ValidationPipe } from '@nestjs/common';

export default function setupApp(app: INestApplication) {
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
}
