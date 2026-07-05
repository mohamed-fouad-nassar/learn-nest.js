import { CanActivate, ExecutionContext } from '@nestjs/common';

import { CustomRequest } from '../../users/decorators/current-user.decorator';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    return !!request.session?.userId;
  }
}
