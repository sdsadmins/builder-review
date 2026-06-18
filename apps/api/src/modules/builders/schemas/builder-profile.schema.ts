import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type BuilderProfileDocument = BuilderProfile & Document;

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Schema({ collection: 'builder_profiles', timestamps: true, versionKey: false })
export class BuilderProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true, index: true, trim: true })
  companyName: string;

  @Prop({ type: String, required: true, unique: true, index: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ type: String, index: true, trim: true })
  reraNumber: string;

  @Prop({ type: String })
  logoUrl: string;

  @Prop({ type: String })
  bannerUrl: string;

  @Prop({ type: String, index: true, trim: true })
  city: string;

  @Prop({ type: String, trim: true })
  state: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, trim: true })
  websiteUrl: string;

  @Prop({ type: String, trim: true, lowercase: true })
  contactEmail: string;

  @Prop({ type: String, trim: true })
  contactPhone: string;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  avgRating: number;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({
    type: String,
    enum: Object.values(VerificationStatus),
    default: VerificationStatus.PENDING,
    index: true,
  })
  verificationStatus: VerificationStatus;

  @Prop({ type: Date })
  verifiedAt: Date;

  @Prop({ type: MongooseSchema.Types.Mixed })
  socialLinks: Record<string, string>;
}

export const BuilderProfileSchema = SchemaFactory.createForClass(BuilderProfile);

BuilderProfileSchema.index({ companyName: 'text', city: 'text' });
