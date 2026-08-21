import { describe, expect, it } from 'vitest';
import { placeSlugSchema } from './place-detail';

describe('placeSlugSchema', () => {
  it('normalizes a valid slug', () => {
    expect(placeSlugSchema.parse('  Wanderly-Demo  ')).toBe('wanderly-demo');
  });

  it('rejects path-like and malformed values', () => {
    expect(() => placeSlugSchema.parse('../admin')).toThrow();
    expect(() => placeSlugSchema.parse('two spaces')).toThrow();
  });
});
