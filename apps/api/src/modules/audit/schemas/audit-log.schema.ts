import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ collection: 'audit_logs', versionKey: false })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  actorId: Types.ObjectId;

  @Prop({ type: String, required: false })
  actorRole: string;

  @Prop({ type: String, required: true })
  action: string;

  @Prop({ type: String, required: true })
  resourceType: string;

  @Prop({ type: Types.ObjectId, required: false })
  resourceId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  previousState: Record<string, unknown>;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  nextState: Record<string, unknown>;

  @Prop({ type: String, required: false })
  ipAddress: string;

  @Prop({ type: String, required: false })
  userAgent: string;

  @Prop({ type: String, required: false })
  sessionId: string;

  @Prop({ type: Date, default: () => new Date() })
  timestamp: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);

// Index on timestamp descending
AuditLogSchema.index({ timestamp: -1 });

// Compound index on actorId + timestamp
AuditLogSchema.index({ actorId: 1, timestamp: -1 });

// Compound index on resourceType + resourceId
AuditLogSchema.index({ resourceType: 1, resourceId: 1 });
