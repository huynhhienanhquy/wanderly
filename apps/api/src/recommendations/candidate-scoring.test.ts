import { describe, expect, it } from 'vitest';
import { scoreCandidate } from './candidate-scoring';

const constraints = { peopleCount: 2, budget: 500000, currency: 'VND', interests: ['cafe'], excludedCategories: [], travelMode: 'DRIVE' as const, notes: null };
describe('scoreCandidate', () => {
  it('scores a matching affordable candidate above a weak candidate', () => {
    const strong = scoreCandidate({ latitude: 21, longitude: 105, rating: 4.8, priceMin: 50000, popularity: 0.9, categories: ['cafe'] }, constraints);
    const weak = scoreCandidate({ latitude: 21, longitude: 105, rating: 2, priceMin: 240000, popularity: 0.1, categories: ['museum'] }, constraints);
    expect(strong.score).toBeGreaterThan(weak.score);
    expect(strong.components.preference).toBe(1);
  });
});
