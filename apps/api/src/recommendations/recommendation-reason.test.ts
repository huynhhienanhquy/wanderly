import { describe, expect, it } from 'vitest';
import { recommendationReason } from './recommendation-reason';

it('explains recommendations only with actual score signals', () => {
  const reason = recommendationReason({ rating: 4.6, priceMin: 50000, categories: ['cafe'] }, { peopleCount: 1, budget: 200000, currency: 'VND', interests: ['cafe'], excludedCategories: [], travelMode: 'WALK', notes: null }, { preference: 1, distance: 0.8, rating: 0.92, budget: 0.75, popularity: 0.5 });
  expect(reason).toContain('cafe');
  expect(reason).toContain('4.6/5');
});
