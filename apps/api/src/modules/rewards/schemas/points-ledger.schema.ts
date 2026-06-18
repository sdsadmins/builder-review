import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PointsLedgerDocument = PointsLedger & Document;

export enum LedgerEntryType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Schema({ collection: 'points_ledger', versionKey: false })
export class PointsLedger {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({
    type: String,
    enum: Object.values(LedgerEntryType),
    required: true,
  })
  type: LedgerEntryType;

  @Prop({ type: String, required: true })
  eventType: string;

  @Prop({ type: Types.ObjectId })
  sourceId: Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;
}

export const PointsLedgerSchema = SchemaFactory.createForClass(PointsLedger);

PointsLedgerSchema.index({ userId: 1, createdAt: -1 });
