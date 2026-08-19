import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
@Module({ controllers: [WeatherController], providers: [{ provide: 'WEATHER_FETCHER', useValue: fetch }, WeatherService] })
export class WeatherModule {}
