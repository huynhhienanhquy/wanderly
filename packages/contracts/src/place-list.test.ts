import { describe, expect, it } from 'vitest';
import { placeListQuerySchema } from './place-list';

describe('placeListQuerySchema', () => {
  it('applies safe defaults and coerces query-string limits', () => {
    expect(placeListQuerySchema.parse({})).toEqual({
      limit: 20,
      sort: 'popular',
    });
    expect(placeListQuerySchema.parse({ limit: '10', sort: 'rating' })).toEqual(
      { limit: 10, sort: 'rating' },
    );
  });

  it('rejects unsupported sort and excessive limits', () => {
    expect(() => placeListQuerySchema.parse({ sort: 'unsafe' })).toThrow();
    expect(() => placeListQuerySchema.parse({ limit: 51 })).toThrow();
  });
});
