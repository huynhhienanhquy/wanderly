import { expect, it } from 'vitest';
import { MapsService } from './maps.service';

it('falls back to a coordinate label without exposing a provider key', async () => {
  delete process.env.GOOGLE_MAPS_API_KEY;
  await expect(new MapsService(fetch).reverseGeocode(10.77, 106.69)).resolves.toEqual({ latitude: 10.77, longitude: 106.69, label: '10.77000, 106.69000' });
});
