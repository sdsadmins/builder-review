import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/require-permission.decorator';
import { RBACService } from '../../modules/rbac/rbac.service';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RBACService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No permission requirement on this route — allow through
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { id: string } | undefined;

    if (!user?.id) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasPermission = await this.rbacService.hasPermission(
      user.id,
      requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Missing required permission: ${requiredPermission}`,
      );
    }

    return true;
  }
}
