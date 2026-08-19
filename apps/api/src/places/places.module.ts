import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { GooglePlacesProvider, PLACES_PROVIDER } from './places-provider';
import { PlacesSyncService } from './places-sync.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, GooglePlacesProvider, PlacesSyncService, { provide: PLACES_PROVIDER, useExisting: GooglePlacesProvider }],
  exports: [PlacesSyncService],
})
export class PlacesModule {}
