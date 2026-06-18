import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RBACModule } from './modules/rbac/rbac.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BuildersModule } from './modules/builders/builders.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ModerationModule } from './modules/moderation/moderation.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { FeedModule } from './modules/feed/feed.module';
import { AuditModule } from './modules/audit/audit.module';
import { ReportsModule } from './modules/reports/reports.module';

import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AuthModule,
    UsersModule,
    RBACModule,
    ReviewsModule,
    BuildersModule,
    VendorsModule,
    ModerationModule,
    RewardsModule,
    FeedModule,
    AuditModule,
    ReportsModule,
  ],
})
export class AppModule {}
