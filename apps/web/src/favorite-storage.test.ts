import { describe, expect, it } from 'vitest';
import { parseFavorites, toggleFavorite } from './favorite-storage';

describe('favorite storage', () => {
  it('ignores invalid and legacy ID-only values and removes duplicates', () => {
    expect(parseFavorites(JSON.stringify(['legacy-id', { id: '1', slug: 'cafe-a' }, { id: '1', slug: 'cafe-a' }]))).toEqual([{ id: '1', slug: 'cafe-a' }]);
  });

  it('adds and removes a favorite idempotently', () => {
    const favorite = { id: '1', slug: 'cafe-a' };
    expect(toggleFavorite([], favorite)).toEqual([favorite]);
    expect(toggleFavorite([favorite], favorite)).toEqual([]);
  });
});
