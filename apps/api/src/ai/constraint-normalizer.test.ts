import { describe, expect, it } from 'vitest';
import { normalizeConstraints } from './constraint-normalizer';

describe('normalizeConstraints', () => {
  it('normalizes currency/categories and applies request location', () => {
    const result = normalizeConstraints({ constraints: { peopleCount: null, currency: 'vnd', interests: [' Cafe ', 'cafe'], excludedCategories: [], travelMode: 'WALK' } }, { input: 'demo', timezone: 'Asia/Ho_Chi_Minh', currentLocation: { latitude: 10, longitude: 106 } });
    expect(result.constraints).toMatchObject({ peopleCount: 1, currency: 'VND', interests: ['cafe'], startLocation: { latitude: 10, longitude: 106 } });
    expect(result.missingFields).toContain('peopleCount');
  });
});
