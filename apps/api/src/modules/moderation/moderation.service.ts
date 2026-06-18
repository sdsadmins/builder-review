import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ModerationQueue,
  ModerationQueueDocument,
  ModerationStatus,
} from './schemas/moderation-queue.schema';
import { Review, ReviewDocument, ReviewStatus } from '../reviews/schemas/review.schema';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(ModerationQueue.name)
    private readonly moderationQueueModel: Model<ModerationQueueDocument>,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async getPendingQueue(
    page = 1,
    limit = 20,
  ): Promise<{
    data: ModerationQueue[];
    total: number;
    page: number;
    limit: number;
  }> {
    const filter = { status: { $in: [ModerationStatus.PENDING, ModerationStatus.CLAIMED] } };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.moderationQueueModel
        .find(filter)
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .populate('reviewId')
        .populate('submittedBy', 'name email')
        .populate('assignedTo', 'name email')
        .lean()
        .exec(),
      this.moderationQueueModel.countDocuments(filter).exec(),
    ]);

    return { data: data as ModerationQueue[], total, page, limit };
  }

  async claimReview(
    queueId: string,
    moderatorId: string,
  ): Promise<ModerationQueue> {
    const entry = await this.moderationQueueModel.findOne({
      _id: new Types.ObjectId(queueId),
      status: ModerationStatus.PENDING,
    });

    if (!entry) {
      throw new NotFoundException(
        'Queue entry not found or already claimed',
      );
    }

    entry.assignedTo = new Types.ObjectId(moderatorId);
    entry.status = ModerationStatus.CLAIMED;
    entry.claimedAt = new Date();
    entry.actionHistory.push({
      action: 'claimed',
      actorId: new Types.ObjectId(moderatorId),
      note: '',
      timestamp: new Date(),
    });

    await entry.save();
    return entry;
  }

  async approveReview(
    queueId: string,
    moderatorId: string,
    note?: string,
  ): Promise<ModerationQueue> {
    const entry = await this.moderationQueueModel.findOne({
      _id: new Types.ObjectId(queueId),
      status: { $in: [ModerationStatus.PENDING, ModerationStatus.CLAIMED] },
    });

    if (!entry) {
      throw new NotFoundException('Queue entry not found');
    }

    if (entry.submittedBy.equals(new Types.ObjectId(moderatorId))) {
      throw new ForbiddenException(
        'Moderators cannot approve their own reviews',
      );
    }

    const now = new Date();

    await this.reviewModel.findByIdAndUpdate(entry.reviewId, {
      $set: {
        status: ReviewStatus.PUBLISHED,
        publishedAt: now,
      },
    });

    entry.status = ModerationStatus.APPROVED;
    entry.resolvedAt = now;
    entry.checkerNote = note ?? '';
    entry.actionHistory.push({
      action: 'approved',
      actorId: new Types.ObjectId(moderatorId),
      note: note ?? '',
      timestamp: now,
    });

    await entry.save();

    const review = await this.reviewModel.findById(entry.reviewId);
    if (review) {
      const BuilderProfileModel = this.reviewModel.db.model('BuilderProfile');
      const reviewsAgg = await this.reviewModel.aggregate([
        { $match: { builderId: review.builderId, status: ReviewStatus.PUBLISHED } },
        { $group: { _id: null, avg: { $avg: '$ratings.overall' }, count: { $sum: 1 } } },
      ]);
      const stats = reviewsAgg[0] ?? { avg: 0, count: 0 };
      await BuilderProfileModel.findByIdAndUpdate(review.builderId, {
        $set: {
          avgRating: Math.round((stats.avg as number) * 10) / 10,
          totalReviews: stats.count as number,
        },
      });
    }

    return entry;
  }

  async rejectReview(
    queueId: string,
    moderatorId: string,
    reason: string,
  ): Promise<ModerationQueue> {
    const entry = await this.moderationQueueModel.findOne({
      _id: new Types.ObjectId(queueId),
      status: { $in: [ModerationStatus.PENDING, ModerationStatus.CLAIMED] },
    });

    if (!entry) {
      throw new NotFoundException('Queue entry not found');
    }

    if (!reason || reason.trim().length === 0) {
      throw new BadRequestException('A reason is required to reject a review');
    }

    const now = new Date();

    await this.reviewModel.findByIdAndUpdate(entry.reviewId, {
      $set: { status: ReviewStatus.REJECTED },
    });

    entry.status = ModerationStatus.REJECTED;
    entry.resolvedAt = now;
    entry.reason = reason;
    entry.actionHistory.push({
      action: 'rejected',
      actorId: new Types.ObjectId(moderatorId),
      note: reason,
      timestamp: now,
    });

    await entry.save();
    return entry;
  }

  async holdReview(
    queueId: string,
    moderatorId: string,
    note: string,
  ): Promise<ModerationQueue> {
    const entry = await this.moderationQueueModel.findOne({
      _id: new Types.ObjectId(queueId),
      status: { $in: [ModerationStatus.PENDING, ModerationStatus.CLAIMED] },
    });

    if (!entry) {
      throw new NotFoundException('Queue entry not found');
    }

    const now = new Date();

    await this.reviewModel.findByIdAndUpdate(entry.reviewId, {
      $set: { status: ReviewStatus.ON_HOLD },
    });

    entry.status = ModerationStatus.ON_HOLD;
    entry.checkerNote = note;
    entry.actionHistory.push({
      action: 'on_hold',
      actorId: new Types.ObjectId(moderatorId),
      note,
      timestamp: now,
    });

    await entry.save();
    return entry;
  }

  async getQueueStats(): Promise<Record<string, number>> {
    const results = await this.moderationQueueModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const stats: Record<string, number> = {
      pending: 0,
      claimed: 0,
      approved: 0,
      rejected: 0,
      on_hold: 0,
    };

    for (const row of results) {
      stats[row._id as string] = row.count as number;
    }

    return stats;
  }

  async getReviewForModeration(queueId: string): Promise<ModerationQueue> {
    const entry = await this.moderationQueueModel
      .findById(queueId)
      .populate({
        path: 'reviewId',
        populate: [
          { path: 'reviewerId', select: 'name email avatarUrl' },
          { path: 'builderId', select: 'companyName slug city' },
        ],
      })
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .lean()
      .exec();

    if (!entry) {
      throw new NotFoundException('Queue entry not found');
    }

    return entry as ModerationQueue;
  }
}
