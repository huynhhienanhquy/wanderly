import { Controller, Get, Query, UnprocessableEntityException } from '@nestjs/common';
import { weatherForecastQuerySchema, type WeatherForecast } from '@wanderly/contracts';
import { WeatherService } from './weather.service';
@Controller('weather')
export class WeatherController {
  constructor(private readonly weather: WeatherService) {}
  @Get('forecast') forecast(@Query() query: Record<string, string>): Promise<WeatherForecast> {
    const parsed = weatherForecastQuerySchema.safeParse({ latitude: Number(query.latitude), longitude: Number(query.longitude), date: query.date });
    if (!parsed.success) throw new UnprocessableEntityException(parsed.error.flatten());
    return this.weather.forecast(parsed.data);
  }
}
