import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from '../reviews/schemas/review.schema';
import {
  BuilderProfile,
  BuilderProfileSchema,
} from '../builders/schemas/builder-profile.schema';
import {
  ModerationQueue,
  ModerationQueueSchema,
} from '../moderation/schemas/moderation-queue.schema';
import {
  ScratchCard,
  ScratchCardSchema,
} from '../rewards/schemas/scratch-card.schema';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: BuilderProfile.name, schema: BuilderProfileSchema },
      { name: ModerationQueue.name, schema: ModerationQueueSchema },
      { name: ScratchCard.name, schema: ScratchCardSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
