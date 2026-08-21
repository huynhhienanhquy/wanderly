import { describe, expect, it, vi } from 'vitest';
import { clearAuthSession, getAccessToken, getRefreshToken, saveAuthSession } from './auth-session';

describe('web auth session', () => {
  it('stores and retrieves both tokens', () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };
    saveAuthSession(storage, { tokens: { accessToken: 'access', refreshToken: 'refresh', expiresIn: 900 } } as never);
    expect([getAccessToken(storage), getRefreshToken(storage)]).toEqual(['access', 'refresh']);
  });

  it('clears all authentication material', () => {
    const removeItem = vi.fn();
    clearAuthSession({ removeItem });
    expect(removeItem.mock.calls.map(([key]) => key)).toEqual(['wanderlyAccessToken', 'wanderlyRefreshToken']);
  });
});
