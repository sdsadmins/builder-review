import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeedPost, FeedPostDocument, FeedPostType } from './schemas/feed-post.schema';

export interface CreateFeedPostDto {
  type?: FeedPostType;
  refId?: string;
  content: string;
  mediaUrls?: string[];
}

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(FeedPost.name)
    private readonly feedPostModel: Model<FeedPostDocument>,
  ) {}

  async getFeed(
    page = 1,
    limit = 20,
    type?: FeedPostType,
  ): Promise<{ data: FeedPost[]; total: number; page: number; limit: number }> {
    const filter: Record<string, unknown> = { isHidden: false };
    if (type) {
      filter.type = type;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.feedPostModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('authorId', 'name avatarUrl')
        .lean()
        .exec(),
      this.feedPostModel.countDocuments(filter).exec(),
    ]);

    return { data: data as FeedPost[], total, page, limit };
  }

  async createPost(userId: string, dto: CreateFeedPostDto): Promise<FeedPost> {
    const post = await this.feedPostModel.create({
      authorId: new Types.ObjectId(userId),
      type: dto.type ?? FeedPostType.TIP,
      refId: dto.refId ? new Types.ObjectId(dto.refId) : undefined,
      content: dto.content,
      mediaUrls: dto.mediaUrls ?? [],
    });
    return post;
  }

  async likePost(postId: string, userId: string): Promise<FeedPost> {
    const userObjectId = new Types.ObjectId(userId);
    const post = await this.feedPostModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const alreadyLiked = post.likedBy.some((id) =>
      id.equals(userObjectId),
    );

    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter((id) => !id.equals(userObjectId));
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      post.likedBy.push(userObjectId);
      post.likesCount += 1;
    }

    await post.save();
    return post;
  }

  async getPost(postId: string): Promise<FeedPost> {
    const post = await this.feedPostModel
      .findById(postId)
      .populate('authorId', 'name avatarUrl')
      .lean()
      .exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post as FeedPost;
  }
}
