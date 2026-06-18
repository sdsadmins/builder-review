import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  VendorProfile,
  VendorProfileDocument,
  VendorCategory,
} from './schemas/vendor-profile.schema';

export interface CreateVendorProfileDto {
  businessName: string;
  category: VendorCategory;
  serviceAreas?: string[];
  logoUrl?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface UpdateVendorProfileDto {
  businessName?: string;
  category?: VendorCategory;
  serviceAreas?: string[];
  logoUrl?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface FindAllVendorsQuery {
  category?: VendorCategory;
  search?: string;
  page?: number;
  limit?: number;
  minRating?: number;
}

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(VendorProfile.name)
    private readonly vendorProfileModel: Model<VendorProfileDocument>,
  ) {}

  private generateSlug(businessName: string): string {
    return businessName
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
    while (await this.vendorProfileModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  async create(
    userId: string,
    dto: CreateVendorProfileDto,
  ): Promise<VendorProfile> {
    const existing = await this.vendorProfileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (existing) {
      throw new ConflictException('Vendor profile already exists for this user');
    }

    const baseSlug = this.generateSlug(dto.businessName);
    const slug = await this.ensureUniqueSlug(baseSlug);

    const profile = await this.vendorProfileModel.create({
      userId: new Types.ObjectId(userId),
      ...dto,
      slug,
    });

    return profile;
  }

  async findAll(query: FindAllVendorsQuery): Promise<{
    data: VendorProfile[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { category, search, page = 1, limit = 20, minRating } = query;
    const filter: Record<string, unknown> = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (minRating !== undefined) {
      filter.avgRating = { $gte: minRating };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.vendorProfileModel
        .find(filter)
        .sort(search ? { score: { $meta: 'textScore' } } : { avgRating: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.vendorProfileModel.countDocuments(filter).exec(),
    ]);

    return { data: data as VendorProfile[], total, page, limit };
  }

  async findBySlug(slug: string): Promise<VendorProfile> {
    const profile = await this.vendorProfileModel
      .findOne({ slug })
      .lean()
      .exec();
    if (!profile) {
      throw new NotFoundException(`Vendor with slug "${slug}" not found`);
    }
    return profile as VendorProfile;
  }

  async findByUserId(userId: string): Promise<VendorProfile> {
    const profile = await this.vendorProfileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();
    if (!profile) {
      throw new NotFoundException('Vendor profile not found');
    }
    return profile as VendorProfile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateVendorProfileDto,
  ): Promise<VendorProfile> {
    const profile = await this.vendorProfileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: dto },
      { new: true, runValidators: true },
    );
    if (!profile) {
      throw new NotFoundException('Vendor profile not found');
    }
    return profile;
  }
}
