import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';
import { Role } from '../../rbac/schemas/role.schema';
import { UserRole } from '../../rbac/schemas/user-role.schema';

const SALT_ROUNDS = 10;

interface TestUserEntry {
  email: string;
  password: string;
  name: string;
  slug: string;
  roleName: string;
}

const TEST_USERS: TestUserEntry[] = [
  {
    email: 'admin@builderreview.in',
    password: 'Test@1234',
    name: 'Super Admin',
    slug: 'super-admin',
    roleName: 'super_admin',
  },
  {
    email: 'user@builderreview.in',
    password: 'Test@1234',
    name: 'Test User',
    slug: 'test-user',
    roleName: 'registered_user',
  },
  {
    email: 'builder@builderreview.in',
    password: 'Test@1234',
    name: 'Test Builder',
    slug: 'test-builder',
    roleName: 'builder',
  },
  {
    email: 'vendor@builderreview.in',
    password: 'Test@1234',
    name: 'Test Vendor',
    slug: 'test-vendor',
    roleName: 'vendor',
  },
];

export async function seedTestUsers(
  userModel: Model<User>,
  roleModel: Model<Role>,
  userRoleModel: Model<UserRole>,
): Promise<void> {
  for (const entry of TEST_USERS) {
    // Upsert the user — only set passwordHash, name, slug, isActive, isVerified on insert
    const passwordHash = await bcrypt.hash(entry.password, SALT_ROUNDS);

    const user = await userModel.findOneAndUpdate(
      { email: entry.email },
      {
        $setOnInsert: {
          email: entry.email,
          passwordHash,
          name: entry.name,
          slug: entry.slug,
          isActive: true,
          isVerified: true,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    if (!user) {
      console.warn(`[TestUsersSeed] Could not upsert user ${entry.email}`);
      continue;
    }

    // Look up the role by name
    const role = await roleModel.findOne({ name: entry.roleName }).lean().exec();
    if (!role) {
      console.warn(
        `[TestUsersSeed] Role "${entry.roleName}" not found — skipping role assignment for ${entry.email}`,
      );
      continue;
    }

    const userId = (user._id as Types.ObjectId);
    const roleId = (role._id as Types.ObjectId);

    // Upsert the user-role assignment (compound unique index prevents duplicates)
    await userRoleModel.updateOne(
      { userId, roleId },
      {
        $setOnInsert: {
          userId,
          roleId,
          grantedAt: new Date(),
        },
      },
      { upsert: true },
    );
  }

  console.log('[TestUsersSeed] Test users seeded successfully');
}
