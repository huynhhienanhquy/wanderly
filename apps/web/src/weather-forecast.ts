import type { PlanWeather } from './plan-weather';

type DailyForecast = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  precipitation_probability_max: number[];
};

type ForecastResponse = { daily?: DailyForecast };

export type WeatherForecast = {
  date: string;
  weather: PlanWeather;
  maximumTemperature: number;
  precipitationProbability: number;
};

const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

export function classifyWeather(weatherCode: number, maximumTemperature: number, precipitationProbability: number): PlanWeather {
  if (RAIN_CODES.has(weatherCode) || precipitationProbability >= 50) return 'RAIN';
  if (maximumTemperature >= 35) return 'HEAT';
  return 'CLEAR';
}

export async function fetchWeatherForecast(
  latitude: number,
  longitude: number,
  date: string,
  fetcher: typeof fetch = fetch,
): Promise<WeatherForecast> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,precipitation_probability_max');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('start_date', date);
  url.searchParams.set('end_date', date);

  const response = await fetcher(url);
  if (!response.ok) throw new Error('Weather provider request failed');
  const payload = await response.json() as ForecastResponse;
  const daily = payload.daily;
  const weatherCode = daily?.weather_code[0];
  const maximumTemperature = daily?.temperature_2m_max[0];
  const precipitationProbability = daily?.precipitation_probability_max[0];
  if (!daily?.time[0] || weatherCode === undefined || maximumTemperature === undefined || precipitationProbability === undefined) {
    throw new Error('Weather provider returned incomplete data');
  }

  return {
    date: daily.time[0],
    weather: classifyWeather(weatherCode, maximumTemperature, precipitationProbability),
    maximumTemperature,
    precipitationProbability,
  };
}
