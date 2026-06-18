import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ type: String, unique: true, sparse: true, trim: true })
  phone: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: String, required: false })
  avatarUrl: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date, required: false })
  verifiedAt: Date;

  // OTP fields for password reset
  @Prop({ type: String, required: false })
  otpHash: string;

  @Prop({ type: Date, required: false })
  otpExpiry: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 }, { sparse: true });
