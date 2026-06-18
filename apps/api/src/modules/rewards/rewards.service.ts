import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ScratchCard,
  ScratchCardDocument,
  ScratchCardStatus,
} from './schemas/scratch-card.schema';
import {
  PointsLedger,
  PointsLedgerDocument,
  LedgerEntryType,
} from './schemas/points-ledger.schema';
import {
  PayoutRequest,
  PayoutRequestDocument,
  PayoutStatus,
} from './schemas/payout-request.schema';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(ScratchCard.name)
    private readonly scratchCardModel: Model<ScratchCardDocument>,
    @InjectModel(PointsLedger.name)
    private readonly pointsLedgerModel: Model<PointsLedgerDocument>,
    @InjectModel(PayoutRequest.name)
    private readonly payoutRequestModel: Model<PayoutRequestDocument>,
  ) {}

  async createScratchCard(
    userId: string,
    reviewId: string,
    amount: number,
  ): Promise<ScratchCard> {
    const idempotencyKey = `${userId}-${reviewId}`;

    const existing = await this.scratchCardModel.findOne({ idempotencyKey });
    if (existing) {
      throw new ConflictException(
        'Scratch card already issued for this review',
      );
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const card = await this.scratchCardModel.create({
      userId: new Types.ObjectId(userId),
      reviewId: new Types.ObjectId(reviewId),
      status: ScratchCardStatus.PENDING,
      rewardAmount: amount,
      currency: 'INR',
      idempotencyKey,
      expiresAt,
    });

    return card;
  }

  async scratchCard(cardId: string, userId: string): Promise<ScratchCard> {
    const card = await this.scratchCardModel.findOne({
      _id: new Types.ObjectId(cardId),
    });

    if (!card) {
      throw new NotFoundException('Scratch card not found');
    }

    if (!card.userId.equals(new Types.ObjectId(userId))) {
      throw new ForbiddenException('This card does not belong to you');
    }

    if (card.status !== ScratchCardStatus.PENDING) {
      throw new BadRequestException(
        `Card cannot be scratched: current status is "${card.status}"`,
      );
    }

    const now = new Date();
    card.status = ScratchCardStatus.SCRATCHED;
    card.scratchedAt = now;
    await card.save();

    await this.pointsLedgerModel.create({
      userId: new Types.ObjectId(userId),
      amount: card.rewardAmount,
      type: LedgerEntryType.CREDIT,
      eventType: 'scratch_card_redeemed',
      sourceId: card._id,
      description: `Scratch card reward of ${card.rewardAmount} ${card.currency}`,
      createdAt: now,
    });

    return card;
  }

  async getMyCards(userId: string): Promise<ScratchCard[]> {
    return this.scratchCardModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec() as Promise<ScratchCard[]>;
  }

  async getPointsBalance(userId: string): Promise<{ balance: number }> {
    const result = await this.pointsLedgerModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          credits: {
            $sum: {
              $cond: [{ $eq: ['$type', LedgerEntryType.CREDIT] }, '$amount', 0],
            },
          },
          debits: {
            $sum: {
              $cond: [{ $eq: ['$type', LedgerEntryType.DEBIT] }, '$amount', 0],
            },
          },
        },
      },
    ]);

    const { credits = 0, debits = 0 } = result[0] ?? {};
    return { balance: (credits as number) - (debits as number) };
  }

  async requestPayout(
    userId: string,
    upiId: string,
    amount: number,
  ): Promise<PayoutRequest> {
    if (amount <= 0) {
      throw new BadRequestException('Payout amount must be greater than zero');
    }

    const { balance } = await this.getPointsBalance(userId);
    if (balance < amount) {
      throw new BadRequestException(
        `Insufficient balance. Available: ${balance}, Requested: ${amount}`,
      );
    }

    const payoutRequest = await this.payoutRequestModel.create({
      userId: new Types.ObjectId(userId),
      amount,
      upiId,
      status: PayoutStatus.QUEUED,
      requestedAt: new Date(),
    });

    await this.pointsLedgerModel.create({
      userId: new Types.ObjectId(userId),
      amount,
      type: LedgerEntryType.DEBIT,
      eventType: 'payout_requested',
      sourceId: payoutRequest._id,
      description: `Payout of ${amount} INR to UPI ${upiId}`,
      createdAt: new Date(),
    });

    return payoutRequest;
  }

  async getMyPayouts(userId: string): Promise<PayoutRequest[]> {
    return this.payoutRequestModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ requestedAt: -1 })
      .lean()
      .exec() as Promise<PayoutRequest[]>;
  }
}
