import { expect, it } from 'vitest';
import { TravelEstimateCache, travelCacheKey } from './travel-estimate-cache';

it('normalizes keys, expires values and evicts the oldest entry', () => {
  let now = 0; const cache = new TravelEstimateCache(10, 1, () => now);
  const input = { origin: { latitude: 10.123456, longitude: 106 }, destination: { latitude: 11, longitude: 107 }, mode: 'DRIVE' as const };
  const value = { distanceMeters: 1, durationSeconds: 1, source: 'HAVERSINE' as const };
  const key = travelCacheKey(input); cache.set(key, value); expect(cache.get(key)).toEqual(value);
  cache.set('second', value); expect(cache.get(key)).toBeUndefined();
  now = 11; expect(cache.get('second')).toBeUndefined();
});
