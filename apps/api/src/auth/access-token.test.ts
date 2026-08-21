import { describe, expect, it } from 'vitest';
import { createAccessToken, verifyAccessToken } from './access-token';

describe('access tokens', () => {
  it('verifies a signed token', () => {
    const token = createAccessToken('user-id', 'ADMIN');
    expect(verifyAccessToken(token)).toMatchObject({
      sub: 'user-id',
      role: 'ADMIN',
    });
  });

  it('rejects a tampered token', () => {
    const token = createAccessToken('user-id', 'USER');
    expect(verifyAccessToken(`${token}tampered`)).toBeNull();
  });
});
