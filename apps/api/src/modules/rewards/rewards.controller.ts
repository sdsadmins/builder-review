import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { RewardsService } from './rewards.service';

interface AuthUser {
  sub: string;
  email: string;
}

interface RequestPayoutDto {
  upiId: string;
  amount: number;
}

@Controller('rewards')
@UseGuards(JwtGuard)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('cards')
  @RequirePermission('reward:scratch')
  async getMyCards(@CurrentUser() user: AuthUser) {
    return this.rewardsService.getMyCards(user.sub);
  }

  @Post('cards/:id/scratch')
  @RequirePermission('reward:scratch')
  @HttpCode(HttpStatus.OK)
  async scratchCard(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.rewardsService.scratchCard(id, user.sub);
  }

  @Get('balance')
  async getBalance(@CurrentUser() user: AuthUser) {
    return this.rewardsService.getPointsBalance(user.sub);
  }

  @Get('payouts')
  @RequirePermission('reward:redeem_upi')
  async getMyPayouts(@CurrentUser() user: AuthUser) {
    return this.rewardsService.getMyPayouts(user.sub);
  }

  @Post('payouts')
  @RequirePermission('reward:redeem_upi')
  @HttpCode(HttpStatus.CREATED)
  async requestPayout(
    @CurrentUser() user: AuthUser,
    @Body() dto: RequestPayoutDto,
  ) {
    return this.rewardsService.requestPayout(user.sub, dto.upiId, dto.amount);
  }
}
