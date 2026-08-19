import { Controller, Get, Query, UnprocessableEntityException } from '@nestjs/common';
import { mapCoordinateSchema, type GeocodedLocation } from '@wanderly/contracts';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly maps: MapsService) {}
  @Get('reverse-geocode') reverse(@Query() query: unknown): Promise<GeocodedLocation> {
    const parsed = mapCoordinateSchema.safeParse({ latitude: Number((query as Record<string, string>).latitude), longitude: Number((query as Record<string, string>).longitude) });
    if (!parsed.success) throw new UnprocessableEntityException('Tọa độ không hợp lệ.');
    return this.maps.reverseGeocode(parsed.data.latitude, parsed.data.longitude);
  }
}
