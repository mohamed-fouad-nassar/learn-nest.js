import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

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
