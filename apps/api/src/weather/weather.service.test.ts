import { describe, expect, it, vi } from 'vitest';
import { classifyWeather, WeatherService } from './weather.service';
describe('WeatherService', () => {
  it('classifies rain before heat', () => { expect(classifyWeather(63, 38, 80)).toBe('RAIN'); expect(classifyWeather(0, 36, 5)).toBe('HEAT'); });
  it('normalizes a one-day forecast', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ daily: { time: ['2026-08-19'], weather_code: [1], temperature_2m_max: [31], precipitation_probability_max: [10] } }), { status: 200 }));
    await expect(new WeatherService(fetcher).forecast({ latitude: 21, longitude: 105, date: '2026-08-19' })).resolves.toMatchObject({ weather: 'CLEAR', source: 'OPEN_METEO' });
  });
});
