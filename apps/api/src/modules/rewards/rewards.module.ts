import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScratchCard, ScratchCardSchema } from './schemas/scratch-card.schema';
import { PointsLedger, PointsLedgerSchema } from './schemas/points-ledger.schema';
import { PayoutRequest, PayoutRequestSchema } from './schemas/payout-request.schema';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScratchCard.name, schema: ScratchCardSchema },
      { name: PointsLedger.name, schema: PointsLedgerSchema },
      { name: PayoutRequest.name, schema: PayoutRequestSchema },
    ]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService, MongooseModule],
})
export class RewardsModule {}
