import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users.service';
import { CustomRequest } from '../decorators/current-user.decorator';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const { userId } = request.session || {};
    if (userId) {
      try {
        const user = await this.usersService.findOne(userId);
        request.currentUser = user;
      } catch (err) {
        if (err instanceof NotFoundException && request.session) {
          request.session.userId = undefined;
        }
      }
    }

    return handler.handle();
  }
}
