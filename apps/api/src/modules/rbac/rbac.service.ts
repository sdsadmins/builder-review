import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { Role, RoleDocument } from './schemas/role.schema';
import {
  RolePermission,
  RolePermissionDocument,
} from './schemas/role-permission.schema';
import { UserRole, UserRoleDocument } from './schemas/user-role.schema';

interface CacheEntry {
  permissions: string[];
  cachedAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

@Injectable()
export class RBACService {
  private readonly permissionCache = new Map<string, CacheEntry>();

  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
    @InjectModel(RolePermission.name)
    private readonly rolePermissionModel: Model<RolePermissionDocument>,
    @InjectModel(UserRole.name)
    private readonly userRoleModel: Model<UserRoleDocument>,
  ) {}

  async getUserPermissions(userId: string): Promise<string[]> {
    const cached = this.permissionCache.get(userId);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return cached.permissions;
    }

    // Get all roles for user
    const userRoles = await this.userRoleModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();

    if (userRoles.length === 0) {
      const result: string[] = [];
      this.permissionCache.set(userId, { permissions: result, cachedAt: Date.now() });
      return result;
    }

    const roleIds = userRoles.map((ur) => ur.roleId);

    // Get all role-permission mappings for those roles
    const rolePermissions = await this.rolePermissionModel
      .find({ roleId: { $in: roleIds } })
      .lean()
      .exec();

    if (rolePermissions.length === 0) {
      const result: string[] = [];
      this.permissionCache.set(userId, { permissions: result, cachedAt: Date.now() });
      return result;
    }

    const permissionIds = rolePermissions.map((rp) => rp.permissionId);

    // Fetch permission names
    const permissions = await this.permissionModel
      .find({ _id: { $in: permissionIds } })
      .select('name')
      .lean()
      .exec();

    const permissionNames = permissions.map((p) => p.name);

    this.permissionCache.set(userId, {
      permissions: permissionNames,
      cachedAt: Date.now(),
    });

    return permissionNames;
  }

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permission);
  }

  invalidateCache(userId: string): void {
    this.permissionCache.delete(userId);
  }

  async createRole(dto: {
    name: string;
    description?: string;
    isSystem?: boolean;
  }): Promise<Role> {
    const role = await this.roleModel.create({
      name: dto.name,
      description: dto.description,
      isSystem: dto.isSystem ?? false,
    });
    return role;
  }

  async assignPermissionsToRole(
    roleId: string,
    permissionIds: string[],
  ): Promise<void> {
    const operations = permissionIds.map((permissionId) => ({
      updateOne: {
        filter: {
          roleId: new Types.ObjectId(roleId),
          permissionId: new Types.ObjectId(permissionId),
        },
        update: {
          $setOnInsert: {
            roleId: new Types.ObjectId(roleId),
            permissionId: new Types.ObjectId(permissionId),
          },
        },
        upsert: true,
      },
    }));

    await this.rolePermissionModel.bulkWrite(operations);
  }

  async assignRoleToUser(
    userId: string,
    roleId: string,
    grantedBy: string,
  ): Promise<void> {
    await this.userRoleModel.updateOne(
      {
        userId: new Types.ObjectId(userId),
        roleId: new Types.ObjectId(roleId),
      },
      {
        $setOnInsert: {
          userId: new Types.ObjectId(userId),
          roleId: new Types.ObjectId(roleId),
          grantedBy: new Types.ObjectId(grantedBy),
          grantedAt: new Date(),
        },
      },
      { upsert: true },
    );

    this.invalidateCache(userId);
  }

  async getRoles(): Promise<Role[]> {
    return this.roleModel.find().lean().exec();
  }

  async getPermissions(): Promise<Permission[]> {
    return this.permissionModel.find().lean().exec();
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    await this.userRoleModel.deleteOne({
      userId: new Types.ObjectId(userId),
      roleId: new Types.ObjectId(roleId),
    });

    this.invalidateCache(userId);
  }
}
