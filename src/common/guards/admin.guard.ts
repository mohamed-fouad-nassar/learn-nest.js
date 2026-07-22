import { CanActivate, ExecutionContext } from '@nestjs/common';

import { CustomRequest } from '../../users/decorators/current-user.decorator';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    if (!request.currentUser) return false;
    return request.currentUser.admin;
  }
}
