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

export enum RoleKey {
  GUEST = 'guest',
  USER = 'user',
  BUILDER = 'builder',
  VENDOR = 'vendor',
  SUPER_ADMIN = 'super_admin',
}

export type RBACMatrix = {
  [role in RoleKey]: PermissionKey[];
};

export const DEFAULT_RBAC_MATRIX: RBACMatrix = {
  [RoleKey.GUEST]: [
    PermissionKey.REVIEW_VIEW_PUBLISHED,
    PermissionKey.BUILDER_VIEW_PUBLIC,
  ],
  [RoleKey.USER]: [
    PermissionKey.REVIEW_CREATE,
    PermissionKey.REVIEW_VIEW_PUBLISHED,
    PermissionKey.REVIEW_VIEW_OWN,
    PermissionKey.BUILDER_VIEW_PUBLIC,
    PermissionKey.FEED_POST,
    PermissionKey.FEED_COMMENT,
    PermissionKey.REWARD_SCRATCH,
    PermissionKey.REWARD_REDEEM_UPI,
  ],
  [RoleKey.BUILDER]: [
    PermissionKey.REVIEW_VIEW_PUBLISHED,
    PermissionKey.BUILDER_VIEW_PUBLIC,
    PermissionKey.BUILDER_MANAGE_OWN_PROFILE,
    PermissionKey.BUILDER_VIEW_ANALYTICS,
    PermissionKey.FEED_POST,
    PermissionKey.FEED_COMMENT,
    PermissionKey.REPORT_EXPORT,
  ],
  [RoleKey.VENDOR]: [
    PermissionKey.REVIEW_VIEW_PUBLISHED,
    PermissionKey.BUILDER_VIEW_PUBLIC,
    PermissionKey.VENDOR_MANAGE_OWN_PROFILE,
    PermissionKey.VENDOR_VIEW_ANALYTICS,
    PermissionKey.FEED_POST,
    PermissionKey.FEED_COMMENT,
    PermissionKey.REPORT_EXPORT,
  ],
  [RoleKey.SUPER_ADMIN]: Object.values(PermissionKey),
};
