import { createHash, createHmac, randomBytes } from 'node:crypto';
import { ConflictException, Injectable } from '@nestjs/common';
import type { AuthResponse, RegisterRequest } from '@wanderly/contracts';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { hashPassword } from './password';

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_DAYS = 30;

function base64Url(value: string): string {
  return Buffer.from(value).toString('base64url');
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: RegisterRequest): Promise<AuthResponse> {
    const passwordHash = await hashPassword(input.password);
    const refreshToken = randomBytes(48).toString('base64url');
    const refreshTokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    );

    try {
      const user = await this.prisma.$transaction(async (database) => {
        const created = await database.user.create({
          data: {
            email: input.email,
            passwordHash,
            profile: { create: { displayName: input.displayName } },
          },
          include: { profile: true },
        });
        await database.userSession.create({
          data: { userId: created.id, refreshTokenHash, expiresAt },
        });
        return created;
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.profile?.displayName ?? input.displayName,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
        },
        tokens: {
          accessToken: this.createAccessToken(user.id, user.role),
          refreshToken,
          expiresIn: ACCESS_TOKEN_TTL_SECONDS,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email đã được sử dụng.');
      }
      throw error;
    }
  }

  private createAccessToken(userId: string, role: string): string {
    const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const payload = base64Url(
      JSON.stringify({
        sub: userId,
        role,
        iat: now,
        exp: now + ACCESS_TOKEN_TTL_SECONDS,
      }),
    );
    const secret =
      process.env.JWT_ACCESS_SECRET ?? 'wanderly-local-access-secret';
    const signature = createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url');
    return `${header}.${payload}.${signature}`;
  }
}
