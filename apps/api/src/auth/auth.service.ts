import { createHash, createHmac, randomBytes } from 'node:crypto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@wanderly/contracts';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { hashPassword, verifyPassword } from './password';
import { PasswordResetMailerService } from './password-reset-mailer.service';

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_DAYS = 30;

function base64Url(value: string): string {
  return Buffer.from(value).toString('base64url');
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resetMailer: PasswordResetMailerService,
  ) {}

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

  async login(input: LoginRequest): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      include: { profile: true },
    });
    if (
      !user ||
      user.status !== 'ACTIVE' ||
      !(await verifyPassword(input.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác.');
    }

    const tokens = this.createTokenPair();
    await this.prisma.$transaction([
      this.prisma.userSession.create({
        data: {
          userId: user.id,
          refreshTokenHash: tokens.refreshTokenHash,
          expiresAt: tokens.refreshExpiresAt,
        },
      }),
      this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }),
    ]);
    return this.toAuthResponse(user, tokens.refreshToken);
  }

  async refresh(input: RefreshTokenRequest): Promise<AuthResponse> {
    const currentHash = this.hashRefreshToken(input.refreshToken);
    const session = await this.prisma.userSession.findFirst({
      where: {
        refreshTokenHash: currentHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: { include: { profile: true } } },
    });
    if (!session || session.user.status !== 'ACTIVE') {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn.',
      );
    }

    const tokens = this.createTokenPair();
    await this.prisma.$transaction(async (database) => {
      const claimed = await database.userSession.updateMany({
        where: { id: session.id, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      if (claimed.count !== 1) {
        throw new UnauthorizedException('Refresh token đã được sử dụng.');
      }
      await database.userSession.create({
        data: {
          userId: session.userId,
          refreshTokenHash: tokens.refreshTokenHash,
          expiresAt: tokens.refreshExpiresAt,
        },
      });
    });
    return this.toAuthResponse(session.user, tokens.refreshToken);
  }

  async logout(input: RefreshTokenRequest): Promise<void> {
    await this.prisma.userSession.updateMany({
      where: {
        refreshTokenHash: this.hashRefreshToken(input.refreshToken),
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }

  async forgotPassword(input: ForgotPasswordRequest): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user || user.status !== 'ACTIVE') return;

    const token = randomBytes(48).toString('base64url');
    await this.prisma.$transaction([
      this.prisma.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      }),
      this.prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: this.hashRefreshToken(token),
          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        },
      }),
    ]);
    await this.resetMailer.send(user.email, token);
  }

  async resetPassword(input: ResetPasswordRequest): Promise<void> {
    const resetToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        tokenHash: this.hashRefreshToken(input.token),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
    if (!resetToken) {
      throw new UnauthorizedException(
        'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
      );
    }

    const passwordHash = await hashPassword(input.password);
    await this.prisma.$transaction(async (database) => {
      const claimed = await database.passwordResetToken.updateMany({
        where: { id: resetToken.id, usedAt: null },
        data: { usedAt: new Date() },
      });
      if (claimed.count !== 1) {
        throw new UnauthorizedException(
          'Token đặt lại mật khẩu đã được sử dụng.',
        );
      }
      await database.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      });
      await database.userSession.updateMany({
        where: { userId: resetToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    });
  }

  private createTokenPair() {
    const refreshToken = randomBytes(48).toString('base64url');
    return {
      refreshToken,
      refreshTokenHash: this.hashRefreshToken(refreshToken),
      refreshExpiresAt: new Date(
        Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
      ),
    };
  }

  private hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  private toAuthResponse(
    user: {
      id: string;
      email: string;
      role: string;
      createdAt: Date;
      profile: { displayName: string } | null;
    },
    refreshToken: string,
  ): AuthResponse {
    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.profile?.displayName ?? user.email,
        role: user.role as 'USER' | 'ADMIN',
        createdAt: user.createdAt.toISOString(),
      },
      tokens: {
        accessToken: this.createAccessToken(user.id, user.role),
        refreshToken,
        expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      },
    };
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
