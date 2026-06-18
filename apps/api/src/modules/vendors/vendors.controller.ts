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
  CreateVendorProfileDto,
  UpdateVendorProfileDto,
} from './vendors.service';
import { VendorsService } from './vendors.service';
import { VendorCategory } from './schemas/vendor-profile.schema';

interface AuthUser {
  sub: string;
  email: string;
}

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async findAll(
    @Query('category') category?: VendorCategory,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('minRating') minRating?: string,
  ) {
    return this.vendorsService.findAll({
      category,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      minRating: minRating ? parseFloat(minRating) : undefined,
    });
  }

  @Get('me/profile')
  @UseGuards(JwtGuard)
  async getMyProfile(@CurrentUser() user: AuthUser) {
    return this.vendorsService.findByUserId(user.sub);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.vendorsService.findBySlug(slug);
  }

  @Post('profile')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateVendorProfileDto,
  ) {
    return this.vendorsService.create(user.sub, dto);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  @RequirePermission('vendor:manage_own_profile')
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateVendorProfileDto,
  ) {
    return this.vendorsService.updateProfile(user.sub, dto);
  }
}
