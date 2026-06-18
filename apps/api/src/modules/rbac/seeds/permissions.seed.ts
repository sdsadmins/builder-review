import { Model } from 'mongoose';
import { Permission, PermissionCategory } from '../schemas/permission.schema';

export enum PermissionKey {
  // Review permissions
  REVIEW_CREATE = 'review:create',
  REVIEW_VIEW_PUBLISHED = 'review:view_published',
  REVIEW_VIEW_OWN = 'review:view_own',
  REVIEW_MODERATE = 'review:moderate',
  REVIEW_DELETE = 'review:delete',

  // Builder permissions
  BUILDER_VIEW_PUBLIC = 'builder:view_public',
  BUILDER_MANAGE_OWN_PROFILE = 'builder:manage_own_profile',
  BUILDER_VIEW_ANALYTICS = 'builder:view_analytics',

  // Vendor permissions
  VENDOR_MANAGE_OWN_PROFILE = 'vendor:manage_own_profile',
  VENDOR_VIEW_ANALYTICS = 'vendor:view_analytics',

  // Feed permissions
  FEED_POST = 'feed:post',
  FEED_COMMENT = 'feed:comment',

  // Reward permissions
  REWARD_SCRATCH = 'reward:scratch',
  REWARD_REDEEM_UPI = 'reward:redeem_upi',

  // Admin permissions
  USER_MANAGE_ALL = 'user:manage_all',
  RBAC_MANAGE_ROLES = 'rbac:manage_roles',
  REPORT_EXPORT = 'report:export',
  AUDIT_VIEW = 'audit:view',
  NOTIFICATION_SEND_BULK = 'notification:send_bulk',
}

interface PermissionSeedEntry {
  name: string;
  description: string;
  category: PermissionCategory;
}

const PERMISSIONS_SEED: PermissionSeedEntry[] = [
  {
    name: PermissionKey.REVIEW_CREATE,
    description: 'Create a new review',
    category: PermissionCategory.REVIEW,
  },
  {
    name: PermissionKey.REVIEW_VIEW_PUBLISHED,
    description: 'View all published reviews',
    category: PermissionCategory.REVIEW,
  },
  {
    name: PermissionKey.REVIEW_VIEW_OWN,
    description: 'View own reviews including drafts',
    category: PermissionCategory.REVIEW,
  },
  {
    name: PermissionKey.REVIEW_MODERATE,
    description: 'Moderate reviews (approve/reject)',
    category: PermissionCategory.REVIEW,
  },
  {
    name: PermissionKey.REVIEW_DELETE,
    description: 'Delete any review',
    category: PermissionCategory.REVIEW,
  },
  {
    name: PermissionKey.BUILDER_VIEW_PUBLIC,
    description: 'View public builder profiles',
    category: PermissionCategory.BUILDER,
  },
  {
    name: PermissionKey.BUILDER_MANAGE_OWN_PROFILE,
    description: 'Manage own builder profile',
    category: PermissionCategory.BUILDER,
  },
  {
    name: PermissionKey.BUILDER_VIEW_ANALYTICS,
    description: 'View builder analytics dashboard',
    category: PermissionCategory.BUILDER,
  },
  {
    name: PermissionKey.VENDOR_MANAGE_OWN_PROFILE,
    description: 'Manage own vendor profile',
    category: PermissionCategory.VENDOR,
  },
  {
    name: PermissionKey.VENDOR_VIEW_ANALYTICS,
    description: 'View vendor analytics dashboard',
    category: PermissionCategory.VENDOR,
  },
  {
    name: PermissionKey.FEED_POST,
    description: 'Create posts in the feed',
    category: PermissionCategory.FEED,
  },
  {
    name: PermissionKey.FEED_COMMENT,
    description: 'Comment on feed posts',
    category: PermissionCategory.FEED,
  },
  {
    name: PermissionKey.REWARD_SCRATCH,
    description: 'Use scratch card rewards',
    category: PermissionCategory.REWARD,
  },
  {
    name: PermissionKey.REWARD_REDEEM_UPI,
    description: 'Redeem rewards via UPI',
    category: PermissionCategory.REWARD,
  },
  {
    name: PermissionKey.USER_MANAGE_ALL,
    description: 'Manage all users in the system',
    category: PermissionCategory.ADMIN,
  },
  {
    name: PermissionKey.RBAC_MANAGE_ROLES,
    description: 'Manage roles and permissions',
    category: PermissionCategory.ADMIN,
  },
  {
    name: PermissionKey.REPORT_EXPORT,
    description: 'Export reports',
    category: PermissionCategory.ADMIN,
  },
  {
    name: PermissionKey.AUDIT_VIEW,
    description: 'View audit logs',
    category: PermissionCategory.ADMIN,
  },
  {
    name: PermissionKey.NOTIFICATION_SEND_BULK,
    description: 'Send bulk notifications to users',
    category: PermissionCategory.ADMIN,
  },
];

export async function seedPermissions(
  permissionModel: Model<Permission>,
): Promise<void> {
  const operations = PERMISSIONS_SEED.map((perm) => ({
    updateOne: {
      filter: { name: perm.name },
      update: { $setOnInsert: perm },
      upsert: true,
    },
  }));

  await permissionModel.bulkWrite(operations);
}
