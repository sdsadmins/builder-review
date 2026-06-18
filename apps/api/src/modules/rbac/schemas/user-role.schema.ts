import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

@Schema({ collection: 'user_roles', versionKey: false })
export class UserRole {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  roleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  grantedBy: Types.ObjectId;

  @Prop({ type: Date, default: () => new Date() })
  grantedAt: Date;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);

// Compound unique index on [userId, roleId]
UserRoleSchema.index({ userId: 1, roleId: 1 }, { unique: true });
