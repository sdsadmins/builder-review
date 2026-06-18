import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

export interface CreateUserDto {
  email: string;
  phone?: string;
  passwordHash: string;
  name: string;
  slug: string;
  avatarUrl?: string;
}

export interface UpdateProfileDto {
  name?: string;
  avatarUrl?: string;
  phone?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone }).exec();
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create({
      email: dto.email.toLowerCase(),
      phone: dto.phone,
      passwordHash: dto.passwordHash,
      name: dto.name,
      slug: dto.slug,
      avatarUrl: dto.avatarUrl,
    });
    return user;
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: dto },
        { new: true, runValidators: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<UserDocument[]> {
    const query: Record<string, unknown> = {};

    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    return this.userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  async countAll(search?: string): Promise<number> {
    const query: Record<string, unknown> = {};

    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    return this.userModel.countDocuments(query).exec();
  }
}
