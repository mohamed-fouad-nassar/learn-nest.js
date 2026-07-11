import {
  Module,
  NestModule,
  ValidationPipe,
  MiddlewareConsumer,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';

import { LoggingMiddleware } from './common/middlewares/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'better-sqlite3',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'blog',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   entities: [User, Report],
    // }),
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
