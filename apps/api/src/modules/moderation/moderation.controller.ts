import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { ModerationService } from './moderation.service';

interface AuthUser {
  sub: string;
  email: string;
}

interface ApproveDto {
  note?: string;
}

interface RejectDto {
  reason: string;
}

interface HoldDto {
  note: string;
}

@Controller('moderation')
@UseGuards(JwtGuard)
@RequirePermission('review:moderate')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get('queue')
  async getPendingQueue(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.moderationService.getPendingQueue(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('queue/stats')
  async getQueueStats() {
    return this.moderationService.getQueueStats();
  }

  @Get(':id')
  async getQueueItem(@Param('id') id: string) {
    return this.moderationService.getReviewForModeration(id);
  }

  @Post(':id/claim')
  @HttpCode(HttpStatus.OK)
  async claimReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.moderationService.claimReview(id, user.sub);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approveReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: ApproveDto,
  ) {
    return this.moderationService.approveReview(id, user.sub, dto.note);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: RejectDto,
  ) {
    return this.moderationService.rejectReview(id, user.sub, dto.reason);
  }

  @Post(':id/hold')
  @HttpCode(HttpStatus.OK)
  async holdReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: HoldDto,
  ) {
    return this.moderationService.holdReview(id, user.sub, dto.note);
  }
}
