import { z } from 'zod';
import { mapCoordinateSchema } from './map-provider';

export const weatherForecastQuerySchema = mapCoordinateSchema.extend({ date: z.iso.date() });
export const weatherForecastSchema = z.object({ date: z.iso.date(), weather: z.enum(['CLEAR', 'RAIN', 'HEAT']), maximumTemperature: z.number(), precipitationProbability: z.number().min(0).max(100), source: z.enum(['OPEN_METEO', 'MANUAL_FALLBACK']) });
export type WeatherForecastQuery = z.infer<typeof weatherForecastQuerySchema>;
export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export const WEATHER_PROVIDER = { primary: 'OPEN_METEO', requiresApiKey: false, timezone: 'auto' } as const;
export const activityEnvironmentSchema = z.enum(['INDOOR', 'OUTDOOR', 'MIXED']);
export type ActivityEnvironment = z.infer<typeof activityEnvironmentSchema>;
export function isWeatherSensitiveActivity(environment: ActivityEnvironment) { return environment === 'OUTDOOR'; }

export function openMeteoForecastUrl(query: WeatherForecastQuery) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(query.latitude)); url.searchParams.set('longitude', String(query.longitude));
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,precipitation_probability_max');
  url.searchParams.set('timezone', 'auto'); url.searchParams.set('start_date', query.date); url.searchParams.set('end_date', query.date);
  return url;
}
