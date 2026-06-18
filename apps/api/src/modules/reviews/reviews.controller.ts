import {
  Controller,
  Get,
  Post,
  Patch,
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
import type { CreateDraftDto, ReportReviewDto } from './reviews.service';
import { ReviewsService } from './reviews.service';

interface AuthUser {
  sub: string;
  email: string;
}

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('draft')
  @UseGuards(JwtGuard)
  @RequirePermission('review:create')
  @HttpCode(HttpStatus.CREATED)
  async createDraft(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateDraftDto,
  ) {
    return this.reviewsService.createDraft(user.sub, dto);
  }

  @Patch('draft/:id/step/:step')
  @UseGuards(JwtGuard)
  @RequirePermission('review:create')
  async updateDraftStep(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('step') step: string,
    @Body() stepData: Record<string, unknown>,
  ) {
    return this.reviewsService.updateDraftStep(
      id,
      user.sub,
      parseInt(step, 10),
      stepData,
    );
  }

  @Post('draft/:id/submit')
  @UseGuards(JwtGuard)
  @RequirePermission('review:create')
  @HttpCode(HttpStatus.CREATED)
  async submitReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.reviewsService.submitReview(id, user.sub);
  }

  @Get('mine')
  @UseGuards(JwtGuard)
  @RequirePermission('review:view_own')
  async getMyReviews(
    @CurrentUser() user: AuthUser,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewsService.getMyReviews(
      user.sub,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('feed')
  async getPublicFeed(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewsService.getPublicFeed(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('builder/:builderId')
  async getBuilderReviews(
    @Param('builderId') builderId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewsService.getBuilderReviews(
      builderId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Post(':id/helpful')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async markHelpful(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.reviewsService.markHelpful(id, user.sub);
  }

  @Post(':id/report')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: ReportReviewDto,
  ) {
    return this.reviewsService.reportReview(id, user.sub, dto.reason);
  }
}
