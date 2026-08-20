import { describe, expect, it } from 'vitest';
import { parseWanderlyLink, toAppUrl, toWebPath, toWebUrl } from './deep-links';

describe('Wanderly deep links', () => {
  it('builds equivalent place links for Web and Mobile', () => {
    const link = { type: 'place', slug: 'pho co hoi an' } as const;
    expect(toWebPath(link)).toBe('/places/pho%20co%20hoi%20an');
    expect(toAppUrl(link)).toBe('wanderly://places/pho%20co%20hoi%20an');
    expect(toWebUrl('https://wanderly.vn', link)).toBe('https://wanderly.vn/places/pho%20co%20hoi%20an');
  });

  it('round-trips shared plan links on both platforms', () => {
    const expected = { type: 'plan', shareToken: 'share-token' } as const;
    expect(parseWanderlyLink('https://wanderly.vn/plans/shared/share-token')).toEqual(expected);
    expect(parseWanderlyLink('wanderly://plans/shared/share-token')).toEqual(expected);
  });

  it('rejects unsupported routes', () => {
    expect(parseWanderlyLink('https://wanderly.vn/admin/users')).toBeNull();
  });
});
