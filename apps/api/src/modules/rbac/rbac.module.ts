import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import {
  RolePermission,
  RolePermissionSchema,
} from './schemas/role-permission.schema';
import { UserRole, UserRoleSchema } from './schemas/user-role.schema';
import { RBACService } from './rbac.service';
import { RBACController } from './rbac.controller';
import { seedPermissions } from './seeds/permissions.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: RolePermission.name, schema: RolePermissionSchema },
      { name: UserRole.name, schema: UserRoleSchema },
    ]),
  ],
  controllers: [RBACController],
  providers: [RBACService],
  exports: [RBACService],
})
export class RBACModule implements OnModuleInit {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async onModuleInit(): Promise<void> {
    await seedPermissions(this.permissionModel);
  }
}
