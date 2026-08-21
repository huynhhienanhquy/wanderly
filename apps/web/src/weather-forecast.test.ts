import { expect, it, vi } from 'vitest';
import { fetchWeatherForecast } from './weather-forecast';
it('loads a normalized forecast from the Wanderly API', async () => {
  const forecast = { date: '2026-08-19', weather: 'RAIN', maximumTemperature: 31, precipitationProbability: 70, source: 'OPEN_METEO' };
  const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify(forecast), { status: 200 }));
  await expect(fetchWeatherForecast('http://api', 21.02, 105.84, '2026-08-19', fetcher)).resolves.toEqual(forecast);
  expect(String(fetcher.mock.calls[0]?.[0])).toContain('/weather/forecast');
});
