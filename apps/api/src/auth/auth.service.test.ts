import { UnauthorizedException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { AuthService } from './auth.service';
import { hashPassword } from './password';

const user = {
  id: '3307daba-1408-4f44-b361-800e6b8d22ac',
  email: 'user@example.com',
  passwordHash: '',
  role: 'USER',
  status: 'ACTIVE',
  createdAt: new Date('2026-08-10T00:00:00.000Z'),
  profile: { displayName: 'Wanderer' },
};

describe('AuthService sessions', () => {
  let database: {
    user: {
      findUnique: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
    userSession: {
      create: ReturnType<typeof vi.fn>;
      findFirst: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
    $transaction: ReturnType<typeof vi.fn>;
  };
  let service: AuthService;

  beforeEach(() => {
    database = {
      user: { findUnique: vi.fn(), update: vi.fn().mockResolvedValue({}) },
      userSession: {
        create: vi.fn().mockResolvedValue({}),
        findFirst: vi.fn(),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: vi.fn(async (input: unknown) =>
        typeof input === 'function'
          ? input(database)
          : Promise.all(input as Promise<unknown>[]),
      ),
    };
    service = new AuthService(database as unknown as PrismaService);
  });

  it('creates a session when credentials are valid', async () => {
    database.user.findUnique.mockResolvedValue({
      ...user,
      passwordHash: await hashPassword('password123'),
    });

    const response = await service.login({
      email: 'user@example.com',
      password: 'password123',
    });

    expect(response.user).toEqual({
      id: user.id,
      email: user.email,
      displayName: 'Wanderer',
      role: 'USER',
      createdAt: '2026-08-10T00:00:00.000Z',
    });
    expect(response.tokens.refreshToken.length).toBeGreaterThanOrEqual(32);
    expect(database.userSession.create).toHaveBeenCalledOnce();
  });

  it('does not reveal whether the account exists', async () => {
    database.user.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'missing@example.com', password: 'password123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rotates a valid refresh token and revokes its session', async () => {
    database.userSession.findFirst.mockResolvedValue({
      id: 'session-id',
      userId: user.id,
      user,
    });

    const response = await service.refresh({ refreshToken: 'x'.repeat(48) });

    expect(response.tokens.refreshToken).not.toBe('x'.repeat(48));
    expect(database.userSession.updateMany).toHaveBeenCalledWith({
      where: { id: 'session-id', revokedAt: null },
      data: { revokedAt: expect.any(Date) },
    });
    expect(database.userSession.create).toHaveBeenCalledOnce();
  });

  it('rejects a refresh token already claimed by another request', async () => {
    database.userSession.findFirst.mockResolvedValue({
      id: 'session-id',
      userId: user.id,
      user,
    });
    database.userSession.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      service.refresh({ refreshToken: 'x'.repeat(48) }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(database.userSession.create).not.toHaveBeenCalled();
  });

  it('revokes the matching active session on logout', async () => {
    await service.logout({ refreshToken: 'x'.repeat(48) });

    expect(database.userSession.updateMany).toHaveBeenCalledWith({
      where: { refreshTokenHash: expect.any(String), revokedAt: null },
      data: { revokedAt: expect.any(Date) },
    });
  });
});
