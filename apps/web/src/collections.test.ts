import { describe, expect, it } from 'vitest';
import { collections } from './collections';

describe('explore collections', () => {
  it('contains every required collection', () => expect(collections.map(({ key }) => key)).toEqual(['trending', 'budget', 'date', 'rainy-day']));
  it('keeps rainy-day results indoors', () => expect(collections.find(({ key }) => key === 'rainy-day')?.options.indoorOutdoor).toBe('INDOOR'));
});
