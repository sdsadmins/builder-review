import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RBACGuard } from '../../common/guards/rbac.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RBACService } from './rbac.service';
import { PermissionKey } from './seeds/permissions.seed';

@Controller('rbac')
@UseGuards(JwtGuard, RBACGuard)
export class RBACController {
  constructor(private readonly rbacService: RBACService) {}

  @Get('roles')
  async getRoles() {
    return this.rbacService.getRoles();
  }

  @Post('roles')
  @RequirePermission(PermissionKey.RBAC_MANAGE_ROLES)
  async createRole(
    @Body() dto: { name: string; description?: string; isSystem?: boolean },
  ) {
    return this.rbacService.createRole(dto);
  }

  @Put('roles/:id/permissions')
  @RequirePermission(PermissionKey.RBAC_MANAGE_ROLES)
  async assignPermissionsToRole(
    @Param('id') roleId: string,
    @Body() dto: { permissionIds: string[] },
  ) {
    await this.rbacService.assignPermissionsToRole(roleId, dto.permissionIds);
    return { message: 'Permissions assigned successfully' };
  }

  @Get('permissions')
  async getPermissions() {
    return this.rbacService.getPermissions();
  }

  @Post('users/:userId/roles')
  @RequirePermission(PermissionKey.RBAC_MANAGE_ROLES)
  async assignRoleToUser(
    @Param('userId') userId: string,
    @Body() dto: { roleId: string },
    @CurrentUser() currentUser: { id: string },
  ) {
    await this.rbacService.assignRoleToUser(userId, dto.roleId, currentUser.id);
    return { message: 'Role assigned successfully' };
  }

  @Delete('users/:userId/roles/:roleId')
  @RequirePermission(PermissionKey.RBAC_MANAGE_ROLES)
  async removeRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    await this.rbacService.removeRoleFromUser(userId, roleId);
    return { message: 'Role removed successfully' };
  }
}
