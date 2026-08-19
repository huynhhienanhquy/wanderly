import { expect, it } from 'vitest';
import { googleMapsDirectionsUrl, googleMapsItineraryUrl } from './map-provider';

it('builds a provider directions URL from validated coordinates', () => {
  const url = new URL(googleMapsDirectionsUrl({ latitude: 10.77, longitude: 106.69 }, { latitude: 10.76, longitude: 106.68 }));
  expect(url.searchParams.get('destination')).toBe('10.77,106.69');
  expect(url.searchParams.get('origin')).toBe('10.76,106.68');
});
it('keeps itinerary order as origin, waypoints and destination', () => {
  const url = new URL(googleMapsItineraryUrl([{ latitude: 1, longitude: 2 }, { latitude: 3, longitude: 4 }, { latitude: 5, longitude: 6 }])!);
  expect(url.searchParams.get('origin')).toBe('1,2');
  expect(url.searchParams.get('waypoints')).toBe('3,4');
  expect(url.searchParams.get('destination')).toBe('5,6');
});
