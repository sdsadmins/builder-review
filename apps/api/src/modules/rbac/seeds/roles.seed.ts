import { Model } from 'mongoose';
import { Role } from '../schemas/role.schema';

interface RoleSeedEntry {
  name: string;
  description: string;
  isSystem: boolean;
}

const ROLES_SEED: RoleSeedEntry[] = [
  {
    name: 'super_admin',
    description: 'Full platform access with all administrative privileges',
    isSystem: true,
  },
  {
    name: 'moderator',
    description: 'Can moderate reviews and manage reported content',
    isSystem: true,
  },
  {
    name: 'builder',
    description: 'Registered builder who can manage their profile and view analytics',
    isSystem: true,
  },
  {
    name: 'vendor',
    description: 'Registered vendor who can manage their profile and view analytics',
    isSystem: true,
  },
  {
    name: 'registered_user',
    description: 'Standard registered user who can write reviews and use the platform',
    isSystem: true,
  },
];

export async function seedRoles(roleModel: Model<Role>): Promise<void> {
  const operations = ROLES_SEED.map((role) => ({
    updateOne: {
      filter: { name: role.name },
      update: { $setOnInsert: role },
      upsert: true,
    },
  }));

  await roleModel.bulkWrite(operations);
}
