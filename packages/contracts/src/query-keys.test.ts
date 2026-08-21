import { describe, expect, it } from 'vitest';
import { queryKeys } from './query-keys';

describe('queryKeys', () => {
  it('creates hierarchical keys suitable for scoped invalidation', () => {
    expect(queryKeys.places.list({ category: 'food', page: 2 })).toEqual([
      'places', 'list', { category: 'food', page: 2 },
    ]);
    expect(queryKeys.places.detail('ho-guom')).toEqual(['places', 'detail', 'ho-guom']);
  });

  it('normalizes filter order and omits undefined values', () => {
    expect(queryKeys.places.list({ q: undefined, city: 'hanoi', limit: 20 }))
      .toEqual(queryKeys.places.list({ limit: 20, city: 'hanoi' }));
  });
});
