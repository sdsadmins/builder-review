export interface User {
  _id: string;
  email: string;
  phone?: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: string[];
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}
