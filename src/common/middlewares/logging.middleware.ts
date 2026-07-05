import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    res.on('finish', () => {
      console.log(
        `[LOG] ${req.method} ${req.url} ${res.statusCode} - ${Date.now() - now}ms`,
      );
    });

    next();
  }
}
