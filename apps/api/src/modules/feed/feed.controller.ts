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
import type { CreateFeedPostDto } from './feed.service';
import { FeedService } from './feed.service';
import { FeedPostType } from './schemas/feed-post.schema';

interface AuthUser {
  sub: string;
  email: string;
}

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: FeedPostType,
  ) {
    return this.feedService.getFeed(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      type,
    );
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.feedService.getPost(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @RequirePermission('feed:post')
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateFeedPostDto,
  ) {
    return this.feedService.createPost(user.sub, dto);
  }

  @Post(':id/like')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async likePost(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.feedService.likePost(id, user.sub);
  }
}
