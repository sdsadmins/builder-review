import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScratchCardDocument = ScratchCard & Document;

export enum ScratchCardStatus {
  PENDING = 'pending',
  SCRATCHED = 'scratched',
  EXPIRED = 'expired',
}

@Schema({ collection: 'scratch_cards', timestamps: true, versionKey: false })
export class ScratchCard {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Review', required: true, index: true })
  reviewId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ScratchCardStatus),
    default: ScratchCardStatus.PENDING,
    index: true,
  })
  status: ScratchCardStatus;

  @Prop({ type: Number, required: true })
  rewardAmount: number;

  @Prop({ type: String, default: 'INR' })
  currency: string;

  @Prop({ type: Date })
  scratchedAt: Date;

  @Prop({
    type: Date,
    default: () => {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d;
    },
    index: { expireAfterSeconds: 0 },
  })
  expiresAt: Date;

  @Prop({ type: String, required: true, unique: true })
  idempotencyKey: string;
}

export const ScratchCardSchema = SchemaFactory.createForClass(ScratchCard);
