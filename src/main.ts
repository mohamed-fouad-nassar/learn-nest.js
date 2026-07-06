import { NestFactory } from '@nestjs/core';

// import setupApp from './setup-app';
import { AppModule } from './app.module';

async function bootstrap() {
  // initialize app using nest factory
  const app = await NestFactory.create(AppModule);

  // // Setup app with all pipes, middlewares, and so on
  // setupApp(app);

  // set global prefix /api for all routes
  app.setGlobalPrefix('api');

  // start server with listening port
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
