import { describe, expect, it, vi } from 'vitest';
import { classifyWeather, fetchWeatherForecast } from './weather-forecast';

describe('weather forecast', () => {
  it('classifies rain before heat and otherwise keeps clear weather', () => {
    expect(classifyWeather(63, 37, 80)).toBe('RAIN');
    expect(classifyWeather(0, 36, 10)).toBe('HEAT');
    expect(classifyWeather(1, 30, 20)).toBe('CLEAR');
  });

  it('loads and normalizes the selected day forecast', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({
      daily: {
        time: ['2026-08-15'],
        weather_code: [61],
        temperature_2m_max: [31],
        precipitation_probability_max: [70],
      },
    }), { status: 200 }));

    await expect(fetchWeatherForecast(21.02, 105.84, '2026-08-15', fetcher)).resolves.toEqual({
      date: '2026-08-15',
      weather: 'RAIN',
      maximumTemperature: 31,
      precipitationProbability: 70,
    });
    expect(fetcher).toHaveBeenCalledOnce();
    expect(String(fetcher.mock.calls[0]?.[0])).toContain('start_date=2026-08-15');
  });

  it('rejects incomplete provider data', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    await expect(fetchWeatherForecast(21.02, 105.84, '2026-08-15', fetcher)).rejects.toThrow('incomplete data');
  });
});
