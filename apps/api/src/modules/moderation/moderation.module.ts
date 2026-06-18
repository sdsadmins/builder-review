import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ModerationQueue,
  ModerationQueueSchema,
} from './schemas/moderation-queue.schema';
import { Review, ReviewSchema } from '../reviews/schemas/review.schema';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModerationQueue.name, schema: ModerationQueueSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [ModerationController],
  providers: [ModerationService],
  exports: [ModerationService, MongooseModule],
})
export class ModerationModule {}
