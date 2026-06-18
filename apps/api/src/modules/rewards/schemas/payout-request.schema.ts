import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PayoutRequestDocument = PayoutRequest & Document;

export enum PayoutStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  REVERSED = 'reversed',
  CANCELLED = 'cancelled',
}

@Schema({ collection: 'payout_requests', timestamps: true, versionKey: false })
export class PayoutRequest {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true, trim: true })
  upiId: string;

  @Prop({
    type: String,
    enum: Object.values(PayoutStatus),
    default: PayoutStatus.QUEUED,
    index: true,
  })
  status: PayoutStatus;

  @Prop({ type: String })
  providerRef: string;

  @Prop({ type: String })
  failureReason: string;

  @Prop({ type: Date, default: () => new Date() })
  requestedAt: Date;

  @Prop({ type: Date })
  processedAt: Date;
}

export const PayoutRequestSchema = SchemaFactory.createForClass(PayoutRequest);
