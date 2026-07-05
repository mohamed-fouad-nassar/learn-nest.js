import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../user.entity';

export type CustomRequest = Request & {
  currentUser?: User;
  session?: { userId?: number };
};

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    return request.currentUser;
  },
);
