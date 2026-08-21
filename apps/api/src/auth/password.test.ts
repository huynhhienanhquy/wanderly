import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './password';

describe('password hashing', () => {
  it('stores a salted hash and verifies only the matching password', async () => {
    const hash = await hashPassword('wanderly-secret');
    expect(hash).not.toContain('wanderly-secret');
    expect(await verifyPassword('wanderly-secret', hash)).toBe(true);
    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });

  it('creates a different hash for the same password', async () => {
    expect(await hashPassword('wanderly-secret')).not.toBe(
      await hashPassword('wanderly-secret'),
    );
  });
});
