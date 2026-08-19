import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { openMeteoForecastUrl, weatherForecastSchema, type WeatherForecast, type WeatherForecastQuery } from '@wanderly/contracts';

const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
export function classifyWeather(code: number, temperature: number, rainProbability: number): WeatherForecast['weather'] {
  if (RAIN_CODES.has(code) || rainProbability >= 50) return 'RAIN';
  if (temperature >= 35) return 'HEAT';
  return 'CLEAR';
}

@Injectable()
export class WeatherService {
  constructor(@Inject('WEATHER_FETCHER') private readonly fetcher: typeof fetch) {}
  async forecast(query: WeatherForecastQuery): Promise<WeatherForecast> {
    try {
      const response = await this.fetcher(openMeteoForecastUrl(query), { signal: AbortSignal.timeout(8_000) });
      if (!response.ok) throw new Error(`status ${response.status}`);
      const body = await response.json() as { daily?: { time?: string[]; weather_code?: number[]; temperature_2m_max?: number[]; precipitation_probability_max?: number[] } };
      const date = body.daily?.time?.[0]; const code = body.daily?.weather_code?.[0];
      const maximumTemperature = body.daily?.temperature_2m_max?.[0]; const precipitationProbability = body.daily?.precipitation_probability_max?.[0];
      if (date === undefined || code === undefined || maximumTemperature === undefined || precipitationProbability === undefined) throw new Error('incomplete response');
      return weatherForecastSchema.parse({ date, weather: classifyWeather(code, maximumTemperature, precipitationProbability), maximumTemperature, precipitationProbability, source: 'OPEN_METEO' });
    } catch (error) { throw new ServiceUnavailableException('Weather provider tạm thời không khả dụng.', { cause: error }); }
  }
}
