export enum ReviewStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
  PUBLISHED = 'published',
  HIDDEN = 'hidden',
  ARCHIVED = 'archived',
}

export enum UserType {
  BUYER = 'buyer',
  OWNER = 'owner',
  TENANT = 'tenant',
  VENDOR = 'vendor',
}

export interface ReviewRatings {
  constructionQuality: number;
  timelyDelivery: number;
  amenities: number;
  legalCompliance: number;
  customerService: number;
  overall: number;
}

export interface ReviewWizardStep {
  stepNumber: number;
  data: Record<string, unknown>;
  completedAt?: Date;
}

export interface ReviewMediaUpload {
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  originalName: string;
}
