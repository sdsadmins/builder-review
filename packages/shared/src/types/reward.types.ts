export enum ScratchCardStatus {
  PENDING = 'pending',
  SCRATCHED = 'scratched',
  EXPIRED = 'expired',
}

export enum PayoutStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  REVERSED = 'reversed',
  CANCELLED = 'cancelled',
}

export enum LedgerEntryType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum RewardEventType {
  REVIEW_PUBLISHED = 'review_published',
  FIRST_REVIEW = 'first_review',
  MEDIA_UPLOADED = 'media_uploaded',
  IDENTITY_VERIFIED = 'identity_verified',
  REFERRAL = 'referral',
}
