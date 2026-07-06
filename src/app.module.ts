import cookieSession from 'cookie-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Report],
    }),
    ReportsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // to get only valid specified fields
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer
      .apply(
        cookieSession({
          keys: ['this-is-the-key-of-cookie-session-middleware'], // used to encrypt the cookie string
        }),
      )
      .forRoutes('*');
  }
}
