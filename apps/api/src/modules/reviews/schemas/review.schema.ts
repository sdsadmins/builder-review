import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

export enum ReviewUserType {
  BUYER = 'buyer',
  OWNER = 'owner',
  TENANT = 'tenant',
  VENDOR = 'vendor',
}

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

@Schema({ _id: false })
class ReviewRatings {
  @Prop({ type: Number, min: 1, max: 5 })
  constructionQuality: number;

  @Prop({ type: Number, min: 1, max: 5 })
  timelyDelivery: number;

  @Prop({ type: Number, min: 1, max: 5 })
  amenities: number;

  @Prop({ type: Number, min: 1, max: 5 })
  legalCompliance: number;

  @Prop({ type: Number, min: 1, max: 5 })
  customerService: number;

  @Prop({ type: Number, min: 1, max: 5 })
  overall: number;
}

const ReviewRatingsSchema = SchemaFactory.createForClass(ReviewRatings);

@Schema({ _id: false })
class ReviewStep {
  @Prop({ type: Number, required: true })
  stepNumber: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  data: Record<string, unknown>;

  @Prop({ type: Date })
  completedAt: Date;
}

const ReviewStepSchema = SchemaFactory.createForClass(ReviewStep);

@Schema({ collection: 'reviews', timestamps: true, versionKey: false })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  reviewerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BuilderProfile', required: true, index: true })
  builderId: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  projectName: string;

  @Prop({ type: String, trim: true })
  projectLocation: string;

  @Prop({ type: String, trim: true })
  unit: string;

  @Prop({ type: Number })
  purchaseYear: number;

  @Prop({
    type: String,
    enum: Object.values(ReviewUserType),
    required: true,
  })
  userType: ReviewUserType;

  @Prop({
    type: String,
    enum: Object.values(ReviewStatus),
    default: ReviewStatus.DRAFT,
    index: true,
  })
  status: ReviewStatus;

  @Prop({ type: ReviewRatingsSchema })
  ratings: ReviewRatings;

  @Prop({ type: String, minlength: 100 })
  summaryText: string;

  @Prop({ type: Boolean })
  wouldRecommend: boolean;

  @Prop({ type: [String], default: [] })
  mediaUrls: string[];

  @Prop({ type: [String], default: [] })
  documentUrls: string[];

  @Prop({ type: Number, default: 0 })
  helpfulCount: number;

  @Prop({ type: Number, default: 0 })
  reportCount: number;

  @Prop({ type: Types.ObjectId, ref: 'ModerationQueue' })
  moderationQueueId: Types.ObjectId;

  @Prop({ type: Date })
  publishedAt: Date;

  @Prop({ type: [ReviewStepSchema], default: [] })
  steps: ReviewStep[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ reviewerId: 1, status: 1 });
ReviewSchema.index({ builderId: 1, status: 1 });
ReviewSchema.index({ publishedAt: -1 });
