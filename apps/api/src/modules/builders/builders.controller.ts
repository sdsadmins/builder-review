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
import type {
  CreateBuilderProfileDto,
  UpdateBuilderProfileDto,
} from './builders.service';
import { BuildersService } from './builders.service';

interface AuthUser {
  sub: string;
  email: string;
}

@Controller('builders')
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('minRating') minRating?: string,
  ) {
    return this.buildersService.findAll({
      city,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      minRating: minRating ? parseFloat(minRating) : undefined,
    });
  }

  @Get('me/analytics')
  @UseGuards(JwtGuard)
  @RequirePermission('builder:view_analytics')
  async getMyAnalytics(@CurrentUser() user: AuthUser) {
    return this.buildersService.getAnalytics(user.sub);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.buildersService.findBySlug(slug);
  }

  @Post('profile')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateBuilderProfileDto,
  ) {
    return this.buildersService.create(user.sub, dto);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  @RequirePermission('builder:manage_own_profile')
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateBuilderProfileDto,
  ) {
    return this.buildersService.updateProfile(user.sub, dto);
  }
}
