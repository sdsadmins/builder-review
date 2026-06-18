import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from '../reviews/schemas/review.schema';
import {
  BuilderProfile,
  BuilderProfileDocument,
} from '../builders/schemas/builder-profile.schema';
import {
  ModerationQueue,
  ModerationQueueDocument,
} from '../moderation/schemas/moderation-queue.schema';
import {
  ScratchCard,
  ScratchCardDocument,
} from '../rewards/schemas/scratch-card.schema';

export interface ReviewReportRow {
  reviewId: string;
  reviewerName: string;
  reviewerEmail: string;
  builderCompanyName: string;
  builderCity: string;
  projectName: string;
  status: string;
  overallRating: number;
  wouldRecommend: boolean;
  submittedAt: string;
  publishedAt: string;
}

export interface BuilderReportRow {
  builderId: string;
  companyName: string;
  city: string;
  state: string;
  verificationStatus: string;
  avgRating: number;
  totalReviews: number;
  reraNumber: string;
}

export interface RewardReportRow {
  cardId: string;
  userId: string;
  reviewId: string;
  rewardAmount: number;
  currency: string;
  status: string;
  issuedAt: string;
  scratchedAt: string;
}

export interface ModerationReportRow {
  queueId: string;
  reviewId: string;
  submittedBy: string;
  assignedTo: string;
  status: string;
  claimedAt: string;
  resolvedAt: string;
  checkerNote: string;
  reason: string;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(BuilderProfile.name)
    private readonly builderProfileModel: Model<BuilderProfileDocument>,
    @InjectModel(ModerationQueue.name)
    private readonly moderationQueueModel: Model<ModerationQueueDocument>,
    @InjectModel(ScratchCard.name)
    private readonly scratchCardModel: Model<ScratchCardDocument>,
  ) {}

  async getReviewsReport(
    from: Date,
    to: Date,
  ): Promise<ReviewReportRow[]> {
    const reviews = await this.reviewModel
      .find({
        createdAt: { $gte: from, $lte: to },
      })
      .populate<{ reviewerId: { name: string; email: string } }>(
        'reviewerId',
        'name email',
      )
      .populate<{ builderId: { companyName: string; city: string } }>(
        'builderId',
        'companyName city',
      )
      .lean()
      .exec();

    return reviews.map((r) => ({
      reviewId: String(r._id),
      reviewerName: r.reviewerId?.name ?? '',
      reviewerEmail: r.reviewerId?.email ?? '',
      builderCompanyName: r.builderId?.companyName ?? '',
      builderCity: r.builderId?.city ?? '',
      projectName: r.projectName ?? '',
      status: r.status,
      overallRating: r.ratings?.overall ?? 0,
      wouldRecommend: r.wouldRecommend ?? false,
      submittedAt: (r as unknown as { createdAt: Date }).createdAt
        ? new Date((r as unknown as { createdAt: Date }).createdAt).toISOString()
        : '',
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : '',
    }));
  }

  async getBuildersReport(): Promise<BuilderReportRow[]> {
    const builders = await this.builderProfileModel
      .find({})
      .lean()
      .exec();

    return builders.map((b) => ({
      builderId: String(b._id),
      companyName: b.companyName,
      city: b.city ?? '',
      state: b.state ?? '',
      verificationStatus: b.verificationStatus,
      avgRating: b.avgRating,
      totalReviews: b.totalReviews,
      reraNumber: b.reraNumber ?? '',
    }));
  }

  async getRewardsReport(
    from: Date,
    to: Date,
  ): Promise<RewardReportRow[]> {
    const cards = await this.scratchCardModel
      .find({
        createdAt: { $gte: from, $lte: to },
      })
      .lean()
      .exec();

    return cards.map((c) => ({
      cardId: String(c._id),
      userId: String(c.userId),
      reviewId: String(c.reviewId),
      rewardAmount: c.rewardAmount,
      currency: c.currency,
      status: c.status,
      issuedAt: (c as unknown as { createdAt: Date }).createdAt
        ? new Date((c as unknown as { createdAt: Date }).createdAt).toISOString()
        : '',
      scratchedAt: c.scratchedAt ? c.scratchedAt.toISOString() : '',
    }));
  }

  async getModerationReport(
    from: Date,
    to: Date,
  ): Promise<ModerationReportRow[]> {
    const entries = await this.moderationQueueModel
      .find({
        createdAt: { $gte: from, $lte: to },
      })
      .populate<{ submittedBy: { name: string; email: string } }>(
        'submittedBy',
        'name email',
      )
      .populate<{ assignedTo: { name: string; email: string } }>(
        'assignedTo',
        'name email',
      )
      .lean()
      .exec();

    return entries.map((e) => ({
      queueId: String(e._id),
      reviewId: String(e.reviewId),
      submittedBy: e.submittedBy
        ? `${e.submittedBy.name} <${e.submittedBy.email}>`
        : '',
      assignedTo: e.assignedTo
        ? `${e.assignedTo.name} <${e.assignedTo.email}>`
        : '',
      status: e.status,
      claimedAt: e.claimedAt ? e.claimedAt.toISOString() : '',
      resolvedAt: e.resolvedAt ? e.resolvedAt.toISOString() : '',
      checkerNote: e.checkerNote ?? '',
      reason: e.reason ?? '',
    }));
  }
}
