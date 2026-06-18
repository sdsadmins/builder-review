import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ReviewDraftDocument = ReviewDraft & Document;

@Schema({ collection: 'review_drafts', timestamps: true, versionKey: false })
export class ReviewDraft {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  reviewerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BuilderProfile', index: true })
  builderId: Types.ObjectId;

  @Prop({ type: Number, default: 1, min: 1, max: 8 })
  currentStep: number;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  stepData: Record<string, unknown>;

  @Prop({ type: Date, default: () => new Date() })
  lastSavedAt: Date;

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
}

export const ReviewDraftSchema = SchemaFactory.createForClass(ReviewDraft);
