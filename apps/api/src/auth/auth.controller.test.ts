import { UnprocessableEntityException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { AuthController } from './auth.controller';
import type { AuthService } from './auth.service';

describe('AuthController', () => {
  it('normalizes valid registration data before creating the user', async () => {
    const register = vi.fn().mockResolvedValue({});
    const controller = new AuthController({
      register,
    } as unknown as AuthService);

    await controller.register({
      email: 'USER@EXAMPLE.COM',
      password: 'password123',
      displayName: '  Wanderer  ',
    });

    expect(register).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
      displayName: 'Wanderer',
    });
  });

  it('rejects invalid registration data', async () => {
    const controller = new AuthController({
      register: vi.fn(),
    } as unknown as AuthService);

    await expect(
      controller.register({
        email: 'invalid',
        password: 'short',
        displayName: '',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('normalizes email before login', async () => {
    const login = vi.fn().mockResolvedValue({});
    const controller = new AuthController({ login } as unknown as AuthService);

    await controller.login({
      email: 'USER@EXAMPLE.COM',
      password: 'password123',
    });

    expect(login).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });

  it('rejects a malformed refresh token', async () => {
    const controller = new AuthController({
      refresh: vi.fn(),
    } as unknown as AuthService);

    await expect(
      controller.refresh({ refreshToken: 'too-short' }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('forwards a valid refresh token to logout', async () => {
    const logout = vi.fn().mockResolvedValue(undefined);
    const controller = new AuthController({ logout } as unknown as AuthService);

    await controller.logout({ refreshToken: 'x'.repeat(48) });

    expect(logout).toHaveBeenCalledWith({ refreshToken: 'x'.repeat(48) });
  });
});
