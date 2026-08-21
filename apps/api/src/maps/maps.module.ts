import { Module } from '@nestjs/common';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({ controllers: [MapsController], providers: [{ provide: 'MAPS_FETCHER', useValue: fetch }, MapsService] })
export class MapsModule {}
