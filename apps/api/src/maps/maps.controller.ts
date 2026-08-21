import { Body, Controller, Get, Post, Query, UnprocessableEntityException } from '@nestjs/common';
import { mapCoordinateSchema, travelEstimateRequestSchema, type GeocodedLocation, type TravelEstimate } from '@wanderly/contracts';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly maps: MapsService) {}
  @Get('reverse-geocode') reverse(@Query() query: unknown): Promise<GeocodedLocation> {
    const parsed = mapCoordinateSchema.safeParse({ latitude: Number((query as Record<string, string>).latitude), longitude: Number((query as Record<string, string>).longitude) });
    if (!parsed.success) throw new UnprocessableEntityException('Tọa độ không hợp lệ.');
    return this.maps.reverseGeocode(parsed.data.latitude, parsed.data.longitude);
  }
  @Post('travel-estimate') travel(@Body() body: unknown): Promise<TravelEstimate> {
    const parsed = travelEstimateRequestSchema.safeParse(body);
    if (!parsed.success) throw new UnprocessableEntityException(parsed.error.flatten());
    return this.maps.travelEstimate(parsed.data);
  }
}
