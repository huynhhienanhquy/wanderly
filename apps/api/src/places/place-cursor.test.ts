import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { decodePlaceCursor, encodePlaceCursor } from './place-cursor';

describe('place cursor', () => {
  const id = '3307daba-1408-4f44-b361-800e6b8d22ac';

  it('round-trips an opaque place id', () => {
    expect(decodePlaceCursor(encodePlaceCursor(id))).toBe(id);
  });

  it('rejects malformed or non-uuid cursors', () => {
    expect(() => decodePlaceCursor('not-a-cursor')).toThrow(
      BadRequestException,
    );
    expect(() =>
      decodePlaceCursor(
        Buffer.from(JSON.stringify({ id: 'unsafe' })).toString('base64url'),
      ),
    ).toThrow(BadRequestException);
  });
});
