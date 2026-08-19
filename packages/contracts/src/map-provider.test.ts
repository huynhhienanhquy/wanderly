import { expect, it } from 'vitest';
import { googleMapsDirectionsUrl } from './map-provider';

it('builds a provider directions URL from validated coordinates', () => {
  const url = new URL(googleMapsDirectionsUrl({ latitude: 10.77, longitude: 106.69 }, { latitude: 10.76, longitude: 106.68 }));
  expect(url.searchParams.get('destination')).toBe('10.77,106.69');
  expect(url.searchParams.get('origin')).toBe('10.76,106.68');
});
