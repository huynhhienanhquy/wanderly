import { describe, expect, it, vi } from 'vitest';
import { fetchInterestCategories, validateInterestSelection } from './preference-api';

describe('preference onboarding', () => {
  it('requires at least three unique interests', () => {
    expect(validateInterestSelection(['a', 'b'])).toBe(false);
    expect(validateInterestSelection(['a', 'b', 'c'])).toBe(true);
    expect(validateInterestSelection(['a', 'a', 'b'])).toBe(false);
  });

  it('loads and validates the category catalog', async () => {
    const categories = [{ id: '11111111-1111-4111-8111-111111111111', slug: 'cafe', name: 'Cà phê', icon: null, description: null }];
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(categories) });
    await expect(fetchInterestCategories('http://api', fetcher)).resolves.toEqual(categories);
  });
});
