import { weatherForecastSchema, type WeatherForecast } from '@wanderly/contracts';

export async function fetchWeatherForecast(baseUrl: string, latitude: number, longitude: number, date: string, fetcher: typeof fetch = fetch): Promise<WeatherForecast> {
  const url = new URL('/weather/forecast', baseUrl);
  url.searchParams.set('latitude', String(latitude)); url.searchParams.set('longitude', String(longitude)); url.searchParams.set('date', date);
  const response = await fetcher(url);
  if (!response.ok) throw new Error('Weather provider request failed');
  return weatherForecastSchema.parse(await response.json());
}
