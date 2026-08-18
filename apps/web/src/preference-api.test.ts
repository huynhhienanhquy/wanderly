import { describe, expect, it, vi } from 'vitest';
import { fetchInterestCategories, saveUserPreferences, validateInterestSelection } from './preference-api';

describe('preference onboarding', () => {
  it('requires at least three unique interests', () => {
    expect(validateInterestSelection(['a', 'b'])).toBe(false);
    expect(validateInterestSelection(['a', 'b', 'c'])).toBe(true);
    expect(validateInterestSelection(['a', 'a', 'b'])).toBe(false);
  });

  it('saves preferences with the authenticated user', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    await saveUserPreferences('http://api', 'token', ['a', 'b', 'c'], fetcher);
    expect(fetcher).toHaveBeenCalledWith('http://api/preferences', expect.objectContaining({ method: 'PUT', body: JSON.stringify({ categoryIds: ['a', 'b', 'c'] }) }));
  });

  it('loads and validates the category catalog', async () => {
    const categories = [{ id: '11111111-1111-4111-8111-111111111111', slug: 'cafe', name: 'Cà phê', icon: null, description: null }];
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(categories) });
    await expect(fetchInterestCategories('http://api', fetcher)).resolves.toEqual(categories);
  });
});
