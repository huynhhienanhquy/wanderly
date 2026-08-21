import { describe, expect, it } from 'vitest';
import { hasWebSession, routes } from './routes';

describe('web route contracts', () => {
  it('builds encoded place routes', () => {
    expect(routes.placeDetail('pho co hoi an')).toBe('/places/pho%20co%20hoi%20an');
  });

  it('detects authenticated sessions without owning storage', () => {
    expect(hasWebSession({ getItem: () => 'token' })).toBe(true);
    expect(hasWebSession({ getItem: () => null })).toBe(false);
  });
});
