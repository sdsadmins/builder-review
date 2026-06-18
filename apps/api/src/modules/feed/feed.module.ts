import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedPost, FeedPostSchema } from './schemas/feed-post.schema';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedPost.name, schema: FeedPostSchema },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
