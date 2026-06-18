import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedPostDocument = FeedPost & Document;

export enum FeedPostType {
  REVIEW = 'review',
  TIP = 'tip',
  QUESTION = 'question',
  ANNOUNCEMENT = 'announcement',
}

@Schema({ collection: 'feed_posts', timestamps: true, versionKey: false })
export class FeedPost {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  authorId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(FeedPostType),
    default: FeedPostType.REVIEW,
    index: true,
  })
  type: FeedPostType;

  @Prop({ type: Types.ObjectId })
  refId: Types.ObjectId;

  @Prop({ type: String, required: true, minlength: 10 })
  content: string;

  @Prop({ type: [String], default: [] })
  mediaUrls: string[];

  @Prop({ type: Number, default: 0 })
  likesCount: number;

  @Prop({ type: Number, default: 0 })
  commentsCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likedBy: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isHidden: boolean;
}

export const FeedPostSchema = SchemaFactory.createForClass(FeedPost);

FeedPostSchema.index({ createdAt: -1 });
FeedPostSchema.index({ type: 1, createdAt: -1 });
