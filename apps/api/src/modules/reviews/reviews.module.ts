import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewDraft, ReviewDraftSchema } from './schemas/review-draft.schema';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: ReviewDraft.name, schema: ReviewDraftSchema },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService, MongooseModule],
})
export class ReviewsModule {}
