import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument, ReviewStatus, ReviewUserType } from './schemas/review.schema';
import { ReviewDraft, ReviewDraftDocument } from './schemas/review-draft.schema';

export interface CreateDraftDto {
  builderId?: string;
  stepData?: Record<string, unknown>;
}

export interface ReportReviewDto {
  reason: string;
}

const TOTAL_STEPS = 8;

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(ReviewDraft.name)
    private readonly reviewDraftModel: Model<ReviewDraftDocument>,
  ) {}

  async createDraft(
    reviewerId: string,
    dto: CreateDraftDto,
  ): Promise<ReviewDraft> {
    const existing = await this.reviewDraftModel.findOne({
      reviewerId: new Types.ObjectId(reviewerId),
      ...(dto.builderId
        ? { builderId: new Types.ObjectId(dto.builderId) }
        : {}),
    });

    if (existing) {
      return existing;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const draft = await this.reviewDraftModel.create({
      reviewerId: new Types.ObjectId(reviewerId),
      builderId: dto.builderId ? new Types.ObjectId(dto.builderId) : undefined,
      stepData: dto.stepData ?? {},
      lastSavedAt: new Date(),
      expiresAt,
    });

    return draft;
  }

  async updateDraftStep(
    draftId: string,
    reviewerId: string,
    stepNumber: number,
    stepData: Record<string, unknown>,
  ): Promise<ReviewDraft> {
    const draft = await this.reviewDraftModel.findOne({
      _id: new Types.ObjectId(draftId),
      reviewerId: new Types.ObjectId(reviewerId),
    });

    if (!draft) {
      throw new NotFoundException('Draft not found');
    }

    const existingStepData = (draft.stepData as Record<string, unknown>) ?? {};
    existingStepData[`step_${stepNumber}`] = stepData;

    draft.stepData = existingStepData;
    draft.currentStep = Math.max(draft.currentStep, stepNumber);
    draft.lastSavedAt = new Date();

    await draft.save();
    return draft;
  }

  async submitReview(
    draftId: string,
    reviewerId: string,
  ): Promise<Review> {
    const draft = await this.reviewDraftModel.findOne({
      _id: new Types.ObjectId(draftId),
      reviewerId: new Types.ObjectId(reviewerId),
    });

    if (!draft) {
      throw new NotFoundException('Draft not found');
    }

    const stepData = (draft.stepData as Record<string, unknown>) ?? {};
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      if (!stepData[`step_${i}`]) {
        throw new BadRequestException(
          `Step ${i} is not complete. All ${TOTAL_STEPS} steps are required before submission.`,
        );
      }
    }

    const step1 = (stepData['step_1'] as Record<string, unknown>) ?? {};
    const step2 = (stepData['step_2'] as Record<string, unknown>) ?? {};
    const step3 = (stepData['step_3'] as Record<string, unknown>) ?? {};
    const step4 = (stepData['step_4'] as Record<string, unknown>) ?? {};
    const step5 = (stepData['step_5'] as Record<string, unknown>) ?? {};

    const review = await this.reviewModel.create({
      reviewerId: new Types.ObjectId(reviewerId),
      builderId: draft.builderId,
      projectName: step1.projectName as string,
      projectLocation: step1.projectLocation as string,
      unit: step1.unit as string,
      purchaseYear: step1.purchaseYear as number,
      userType: step1.userType as ReviewUserType,
      ratings: step2.ratings ?? {},
      summaryText: step3.summaryText as string,
      wouldRecommend: step4.wouldRecommend as boolean,
      mediaUrls: (step5.mediaUrls as string[]) ?? [],
      documentUrls: (step5.documentUrls as string[]) ?? [],
      status: ReviewStatus.SUBMITTED,
      steps: Array.from({ length: TOTAL_STEPS }, (_, i) => ({
        stepNumber: i + 1,
        data: stepData[`step_${i + 1}`] ?? {},
        completedAt: new Date(),
      })),
    });

    const ModerationQueueModel = this.reviewModel.db.model('ModerationQueue');
    const [queueEntry] = await ModerationQueueModel.create([
      {
        reviewId: review._id,
        submittedBy: new Types.ObjectId(reviewerId),
        status: 'pending',
      },
    ]);

    await this.reviewModel.findByIdAndUpdate(review._id, {
      $set: { moderationQueueId: (queueEntry as { _id: Types.ObjectId })._id },
    });

    await this.reviewDraftModel.findByIdAndDelete(draftId);

    return review;
  }

  async getMyReviews(
    reviewerId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Review[]; total: number; page: number; limit: number }> {
    const filter = { reviewerId: new Types.ObjectId(reviewerId) };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.reviewModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('builderId', 'companyName slug logoUrl')
        .lean()
        .exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);

    return { data: data as Review[], total, page, limit };
  }

  async getBuilderReviews(
    builderId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Review[]; total: number; page: number; limit: number }> {
    const filter = {
      builderId: new Types.ObjectId(builderId),
      status: ReviewStatus.PUBLISHED,
    };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.reviewModel
        .find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('reviewerId', 'name avatarUrl')
        .lean()
        .exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);

    return { data: data as Review[], total, page, limit };
  }

  async getPublicFeed(
    page = 1,
    limit = 20,
  ): Promise<{ data: Review[]; total: number; page: number; limit: number }> {
    const filter = { status: ReviewStatus.PUBLISHED };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.reviewModel
        .find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('builderId', 'companyName slug logoUrl city')
        .populate('reviewerId', 'name avatarUrl')
        .lean()
        .exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);

    return { data: data as Review[], total, page, limit };
  }

  async markHelpful(reviewId: string, userId: string): Promise<Review> {
    const review = await this.reviewModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(reviewId),
        status: ReviewStatus.PUBLISHED,
      },
      { $inc: { helpfulCount: 1 } },
      { new: true },
    );

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async reportReview(
    reviewId: string,
    userId: string,
    reason: string,
  ): Promise<Review> {
    const review = await this.reviewModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(reviewId),
        status: ReviewStatus.PUBLISHED,
      },
      { $inc: { reportCount: 1 } },
      { new: true },
    );

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }
}
