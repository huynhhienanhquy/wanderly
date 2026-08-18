import { describe, expect, it } from 'vitest';
import { matchesHardConstraints, type Candidate } from './hard-constraint-filter';

const candidate: Candidate = { latitude: 21.02, longitude: 105.85, priceMin: 100000, categories: ['cafe'], openingHours: [{ dayOfWeek: 1, openMinutes: 480, closeMinutes: 1320, isClosed: false }] };
const base = { peopleCount: 2, budget: 500000, currency: 'VND', interests: [], excludedCategories: [], travelMode: 'DRIVE' as const, notes: null };

describe('matchesHardConstraints', () => {
  it('accepts a candidate satisfying budget, radius and hours', () => expect(matchesHardConstraints(candidate, { ...base, date: '2026-08-17', startTime: '10:00', startLocation: { latitude: 21.02, longitude: 105.85 }, maxTravelRadiusMeters: 5000 })).toBe(true));
  it('rejects excluded, over-budget, distant and closed candidates', () => {
    expect(matchesHardConstraints(candidate, { ...base, excludedCategories: ['cafe'] })).toBe(false);
    expect(matchesHardConstraints(candidate, { ...base, budget: 100000 })).toBe(false);
    expect(matchesHardConstraints(candidate, { ...base, startLocation: { latitude: 10.77, longitude: 106.69 }, maxTravelRadiusMeters: 5000 })).toBe(false);
    expect(matchesHardConstraints(candidate, { ...base, date: '2026-08-17', startTime: '23:00' })).toBe(false);
  });
});
