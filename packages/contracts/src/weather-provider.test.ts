import { expect, it } from 'vitest';
import { isWeatherSensitiveActivity, openMeteoForecastUrl } from './weather-provider';
it('builds a one-day Open-Meteo query', () => {
  const url = openMeteoForecastUrl({ latitude: 21.02, longitude: 105.85, date: '2026-08-19' });
  expect(url.searchParams.get('start_date')).toBe('2026-08-19'); expect(url.searchParams.get('end_date')).toBe('2026-08-19');
});
it('treats only fully outdoor activities as weather-sensitive', () => { expect(isWeatherSensitiveActivity('OUTDOOR')).toBe(true); expect(isWeatherSensitiveActivity('INDOOR')).toBe(false); expect(isWeatherSensitiveActivity('MIXED')).toBe(false); });
