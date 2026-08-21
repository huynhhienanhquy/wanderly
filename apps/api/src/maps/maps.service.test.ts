import { expect, it } from 'vitest';
import { MapsService } from './maps.service';

it('falls back to a coordinate label without exposing a provider key', async () => {
  delete process.env.GOOGLE_MAPS_API_KEY;
  await expect(new MapsService(fetch).reverseGeocode(10.77, 106.69)).resolves.toEqual({ latitude: 10.77, longitude: 106.69, label: '10.77000, 106.69000' });
});
it('estimates travel using a bounded Haversine fallback', async () => {
  delete process.env.GOOGLE_ROUTES_API_KEY;
  const result = await new MapsService(fetch).travelEstimate({ origin: { latitude: 21.02, longitude: 105.85 }, destination: { latitude: 21.03, longitude: 105.86 }, mode: 'WALK' });
  expect(result.source).toBe('HAVERSINE');
  expect(result.distanceMeters).toBeGreaterThan(1000);
  expect(result.durationSeconds).toBeGreaterThan(0);
});
it('falls back when the routes provider returns an error', async () => {
  process.env.GOOGLE_ROUTES_API_KEY = 'test-key';
  const service = new MapsService(async () => new Response('{}', { status: 503 }));
  await expect(service.travelEstimate({ origin: { latitude: 21, longitude: 105 }, destination: { latitude: 21.01, longitude: 105.01 }, mode: 'DRIVE' })).resolves.toMatchObject({ source: 'HAVERSINE' });
  delete process.env.GOOGLE_ROUTES_API_KEY;
});
