import { expect, it, vi } from 'vitest';
import { reverseGeocode } from './location-api';
it('validates reverse-geocoded coordinates', async () => {
  const value = { latitude: 10.77, longitude: 106.69, label: 'TP.HCM' };
  await expect(reverseGeocode('http://api', 10.77, 106.69, vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(value) }))).resolves.toEqual(value);
});
