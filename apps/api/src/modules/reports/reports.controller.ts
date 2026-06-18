import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtGuard)
@RequirePermission('report:export')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('reviews')
  async getReviewsReport(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const fromDate = from ? new Date(from) : new Date(0);
    const toDate = to ? new Date(to) : new Date();
    return this.reportsService.getReviewsReport(fromDate, toDate);
  }

  @Get('builders')
  async getBuildersReport() {
    return this.reportsService.getBuildersReport();
  }

  @Get('rewards')
  async getRewardsReport(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const fromDate = from ? new Date(from) : new Date(0);
    const toDate = to ? new Date(to) : new Date();
    return this.reportsService.getRewardsReport(fromDate, toDate);
  }

  @Get('moderation')
  async getModerationReport(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const fromDate = from ? new Date(from) : new Date(0);
    const toDate = to ? new Date(to) : new Date();
    return this.reportsService.getModerationReport(fromDate, toDate);
  }
}
