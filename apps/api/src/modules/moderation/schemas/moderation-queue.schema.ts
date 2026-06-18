import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ModerationQueueDocument = ModerationQueue & Document;

export enum ModerationStatus {
  PENDING = 'pending',
  CLAIMED = 'claimed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
}

@Schema({ _id: false })
class ActionHistoryEntry {
  @Prop({ type: String, required: true })
  action: string;

  @Prop({ type: Types.ObjectId, required: true })
  actorId: Types.ObjectId;

  @Prop({ type: String })
  note: string;

  @Prop({ type: Date, default: () => new Date() })
  timestamp: Date;
}

const ActionHistoryEntrySchema = SchemaFactory.createForClass(ActionHistoryEntry);

@Schema({ collection: 'moderation_queue', timestamps: true, versionKey: false })
export class ModerationQueue {
  @Prop({ type: Types.ObjectId, ref: 'Review', required: true, unique: true })
  reviewId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  submittedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ModerationStatus),
    default: ModerationStatus.PENDING,
    index: true,
  })
  status: ModerationStatus;

  @Prop({ type: Date })
  claimedAt: Date;

  @Prop({ type: Date })
  resolvedAt: Date;

  @Prop({ type: String })
  checkerNote: string;

  @Prop({ type: String })
  reason: string;

  @Prop({ type: [ActionHistoryEntrySchema], default: [] })
  actionHistory: ActionHistoryEntry[];
}

export const ModerationQueueSchema = SchemaFactory.createForClass(ModerationQueue);
