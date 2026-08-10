import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { ProfileService } from './profile.service';

const record = {
  id: '3307daba-1408-4f44-b361-800e6b8d22ac',
  email: 'user@example.com',
  profile: {
    displayName: 'Wanderer',
    avatarUrl: null,
    phone: null,
    timezone: 'Asia/Ho_Chi_Minh',
    locale: 'vi-VN',
  },
};
describe('ProfileService', () => {
  let database: {
    user: { findFirst: ReturnType<typeof vi.fn> };
    userProfile: { update: ReturnType<typeof vi.fn> };
  };
  let service: ProfileService;
  beforeEach(() => {
    database = {
      user: { findFirst: vi.fn().mockResolvedValue(record) },
      userProfile: { update: vi.fn().mockResolvedValue({}) },
    };
    service = new ProfileService(database as unknown as PrismaService);
  });
  it('returns the complete profile owned by the authenticated user', async () => {
    expect(await service.get(record.id)).toEqual({
      id: record.id,
      email: record.email,
      ...record.profile,
    });
    expect(database.user.findFirst).toHaveBeenCalledWith({
      where: { id: record.id, status: 'ACTIVE' },
      include: { profile: true },
    });
  });
  it('updates only the authenticated user profile', async () => {
    await service.update(record.id, { displayName: 'New name' });
    expect(database.userProfile.update).toHaveBeenCalledWith({
      where: { userId: record.id },
      data: { displayName: 'New name' },
    });
  });
  it('rejects a missing or inactive user', async () => {
    database.user.findFirst.mockResolvedValue(null);
    await expect(service.get(record.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
