import { describe, expect, it } from 'vitest';
import { distanceMeters } from './place-distance';

describe('place distance', () => {
  it('returns zero for the same coordinate', () => expect(distanceMeters(10.77, 106.69, 10.77, 106.69)).toBe(0));
  it('calculates a realistic HCMC distance', () => expect(distanceMeters(10.7769, 106.7009, 10.7798, 106.699)).toBeGreaterThan(300));
});
