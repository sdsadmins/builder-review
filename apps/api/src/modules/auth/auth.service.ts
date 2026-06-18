import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UserDocument } from '../users/schemas/user.schema';

export interface AuthTokens {
  accessToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: {
    id: string;
    email: string;
    name: string;
    slug: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    if (dto.phone) {
      const existingPhone = await this.usersService.findByPhone(dto.phone);
      if (existingPhone) {
        throw new BadRequestException('Phone number is already registered');
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const slug = this.generateSlug(dto.name);

    const user = await this.usersService.create({
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      name: dto.name,
      slug,
    });

    const tokens = await this.generateTokens(
      (user._id as { toString(): string }).toString(),
      user.email,
    );

    return {
      ...tokens,
      user: {
        id: (user._id as { toString(): string }).toString(),
        email: user.email,
        name: user.name,
        slug: user.slug,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
      },
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(
      (user._id as { toString(): string }).toString(),
      user.email,
    );

    return {
      ...tokens,
      user: {
        id: (user._id as { toString(): string }).toString(),
        email: user.email,
        name: user.name,
        slug: user.slug,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
      },
    };
  }

  async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const payload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return { accessToken };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);

    // Always return success to avoid email enumeration
    if (!user) {
      return { message: 'If that email exists, an OTP has been sent' };
    }

    const otp = this.generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otpHash = otpHash;
    user.otpExpiry = otpExpiry;
    await (user as UserDocument).save();

    // In a real app, send OTP via SMS/email here
    // For now, we log it (remove in production)
    console.log(`[DEV ONLY] OTP for ${email}: ${otp}`);

    return { message: 'If that email exists, an OTP has been sent' };
  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    if (!user.otpHash || !user.otpExpiry) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException('OTP has expired');
    }

    const isOtpValid = await bcrypt.compare(otp, user.otpHash);
    if (!isOtpValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    user.passwordHash = newPasswordHash;
    user.otpHash = undefined as unknown as string;
    user.otpExpiry = undefined as unknown as Date;
    await (user as UserDocument).save();

    return { message: 'Password reset successfully' };
  }

  private generateOtp(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
  }

  private generateSlug(name: string): string {
    const base = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const suffix = Math.random().toString(36).substring(2, 8);
    return `${base}-${suffix}`;
  }
}
