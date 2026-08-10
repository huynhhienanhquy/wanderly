import { Injectable, NotFoundException } from '@nestjs/common';
import type { Profile, UpdateProfileRequest } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string): Promise<Profile> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, status: 'ACTIVE' },
      include: { profile: true },
    });
    if (!user || !user.profile)
      throw new NotFoundException('Không tìm thấy hồ sơ.');
    return {
      id: user.id,
      email: user.email,
      displayName: user.profile.displayName,
      avatarUrl: user.profile.avatarUrl,
      phone: user.profile.phone,
      timezone: user.profile.timezone,
      locale: user.profile.locale,
    };
  }

  async update(userId: string, input: UpdateProfileRequest): Promise<Profile> {
    const existing = await this.prisma.user.findFirst({
      where: { id: userId, status: 'ACTIVE' },
    });
    if (!existing) throw new NotFoundException('Không tìm thấy hồ sơ.');
    await this.prisma.userProfile.update({ where: { userId }, data: input });
    return this.get(userId);
  }
}
