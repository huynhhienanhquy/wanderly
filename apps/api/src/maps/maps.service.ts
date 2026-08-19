import { Inject, Injectable } from '@nestjs/common';
import type { GeocodedLocation } from '@wanderly/contracts';

@Injectable()
export class MapsService {
  constructor(@Inject('MAPS_FETCHER') private readonly fetcher: typeof fetch) {}
  async reverseGeocode(latitude: number, longitude: number): Promise<GeocodedLocation> {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) return { latitude, longitude, label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` };
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    url.searchParams.set('latlng', `${latitude},${longitude}`); url.searchParams.set('key', key);
    try {
      const response = await this.fetcher(url.toString());
      const body = await response.json() as { results?: Array<{ formatted_address?: string }> };
      return { latitude, longitude, label: body.results?.[0]?.formatted_address ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` };
    } catch { return { latitude, longitude, label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` }; }
  }
}
