import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BuilderProfile,
  BuilderProfileDocument,
} from './schemas/builder-profile.schema';

export interface CreateBuilderProfileDto {
  companyName: string;
  reraNumber?: string;
  logoUrl?: string;
  bannerUrl?: string;
  city?: string;
  state?: string;
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Record<string, string>;
}

export interface UpdateBuilderProfileDto {
  companyName?: string;
  reraNumber?: string;
  logoUrl?: string;
  bannerUrl?: string;
  city?: string;
  state?: string;
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Record<string, string>;
}

export interface FindAllBuildersQuery {
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
  minRating?: number;
}

@Injectable()
export class BuildersService {
  constructor(
    @InjectModel(BuilderProfile.name)
    private readonly builderProfileModel: Model<BuilderProfileDocument>,
  ) {}

  private generateSlug(companyName: string): string {
    return companyName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private async ensureUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    while (await this.builderProfileModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  async create(
    userId: string,
    dto: CreateBuilderProfileDto,
  ): Promise<BuilderProfile> {
    const existing = await this.builderProfileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (existing) {
      throw new ConflictException('Builder profile already exists for this user');
    }

    const baseSlug = this.generateSlug(dto.companyName);
    const slug = await this.ensureUniqueSlug(baseSlug);

    const profile = await this.builderProfileModel.create({
      userId: new Types.ObjectId(userId),
      ...dto,
      slug,
    });

    return profile;
  }

  async findAll(query: FindAllBuildersQuery): Promise<{
    data: BuilderProfile[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { city, search, page = 1, limit = 20, minRating } = query;
    const filter: Record<string, unknown> = {};

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (minRating !== undefined) {
      filter.avgRating = { $gte: minRating };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.builderProfileModel
        .find(filter)
        .sort(search ? { score: { $meta: 'textScore' } } : { avgRating: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.builderProfileModel.countDocuments(filter).exec(),
    ]);

    return { data: data as BuilderProfile[], total, page, limit };
  }

  async findBySlug(slug: string): Promise<BuilderProfile> {
    const profile = await this.builderProfileModel
      .findOne({ slug })
      .lean()
      .exec();
    if (!profile) {
      throw new NotFoundException(`Builder with slug "${slug}" not found`);
    }
    return profile as BuilderProfile;
  }

  async findByUserId(userId: string): Promise<BuilderProfile> {
    const profile = await this.builderProfileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();
    if (!profile) {
      throw new NotFoundException('Builder profile not found');
    }
    return profile as BuilderProfile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateBuilderProfileDto,
  ): Promise<BuilderProfile> {
    const profile = await this.builderProfileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: dto },
      { new: true, runValidators: true },
    );
    if (!profile) {
      throw new NotFoundException('Builder profile not found');
    }
    return profile;
  }

  async updateRatingStats(builderId: string): Promise<void> {
    const result = await this.builderProfileModel.db
      .collection('reviews')
      .aggregate([
        {
          $match: {
            builderId: new Types.ObjectId(builderId),
            status: 'published',
          },
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$ratings.overall' },
            totalReviews: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const stats = result[0] ?? { avgRating: 0, totalReviews: 0 };

    await this.builderProfileModel.findByIdAndUpdate(builderId, {
      $set: {
        avgRating: Math.round((stats.avgRating as number) * 10) / 10,
        totalReviews: stats.totalReviews as number,
      },
    });
  }

  async getAnalytics(userId: string): Promise<Record<string, unknown>> {
    const profile = await this.builderProfileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();

    if (!profile) {
      throw new NotFoundException('Builder profile not found');
    }

    const builderId = (profile as BuilderProfileDocument)._id;

    const reviewStats = await this.builderProfileModel.db
      .collection('reviews')
      .aggregate([
        {
          $match: {
            builderId,
            status: 'published',
          },
        },
        {
          $group: {
            _id: null,
            avgOverall: { $avg: '$ratings.overall' },
            avgConstruction: { $avg: '$ratings.constructionQuality' },
            avgDelivery: { $avg: '$ratings.timelyDelivery' },
            avgAmenities: { $avg: '$ratings.amenities' },
            avgLegal: { $avg: '$ratings.legalCompliance' },
            avgCustomer: { $avg: '$ratings.customerService' },
            totalReviews: { $sum: 1 },
            wouldRecommend: { $sum: { $cond: ['$wouldRecommend', 1, 0] } },
          },
        },
      ])
      .toArray();

    return {
      profile,
      reviewStats: reviewStats[0] ?? {},
    };
  }
}
