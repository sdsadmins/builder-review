import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VendorProfileDocument = VendorProfile & Document;

export enum VendorCategory {
  ARCHITECT = 'architect',
  CONTRACTOR = 'contractor',
  INTERIOR_DESIGNER = 'interior_designer',
  PROPERTY_MANAGER = 'property_manager',
  LEGAL = 'legal',
  FINANCIAL = 'financial',
  OTHER = 'other',
}

export enum VendorVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Schema({ collection: 'vendor_profiles', timestamps: true, versionKey: false })
export class VendorProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true, index: true, trim: true })
  businessName: string;

  @Prop({ type: String, required: true, unique: true, index: true, trim: true, lowercase: true })
  slug: string;

  @Prop({
    type: String,
    enum: Object.values(VendorCategory),
    required: true,
    index: true,
  })
  category: VendorCategory;

  @Prop({ type: [String], default: [] })
  serviceAreas: string[];

  @Prop({ type: String })
  logoUrl: string;

  @Prop({ type: String })
  description: string;

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
    enum: Object.values(VendorVerificationStatus),
    default: VendorVerificationStatus.PENDING,
    index: true,
  })
  verificationStatus: VendorVerificationStatus;
}

export const VendorProfileSchema = SchemaFactory.createForClass(VendorProfile);

VendorProfileSchema.index({ businessName: 'text', serviceAreas: 'text' });
