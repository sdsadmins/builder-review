import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

export enum PermissionCategory {
  REVIEW = 'review',
  BUILDER = 'builder',
  VENDOR = 'vendor',
  FEED = 'feed',
  REWARD = 'reward',
  ADMIN = 'admin',
}

@Schema({ collection: 'permissions', timestamps: true })
export class Permission {
  @Prop({ type: String, required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(PermissionCategory),
    required: true,
  })
  category: PermissionCategory;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
