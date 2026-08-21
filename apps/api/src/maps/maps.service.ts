import { Inject, Injectable } from '@nestjs/common';
import type { GeocodedLocation, TravelEstimate, TravelEstimateRequest } from '@wanderly/contracts';
import { distanceMeters } from '../places/place-distance';
import { TravelEstimateCache, travelCacheKey } from './travel-estimate-cache';

@Injectable()
export class MapsService {
  private readonly travelCache = new TravelEstimateCache();
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

  async travelEstimate(input: TravelEstimateRequest): Promise<TravelEstimate> {
    const cacheKey = travelCacheKey(input);
    const cached = this.travelCache.get(cacheKey);
    if (cached) return cached;
    const key = process.env.GOOGLE_ROUTES_API_KEY;
    if (key) try {
      const response = await this.fetcher('https://routes.googleapis.com/directions/v2:computeRoutes', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration' }, body: JSON.stringify({ origin: { location: { latLng: input.origin } }, destination: { location: { latLng: input.destination } }, travelMode: input.mode }) });
      if (response.ok) {
        const body = await response.json() as { routes?: Array<{ distanceMeters?: number; duration?: string }> };
        const route = body.routes?.[0];
        if (route?.distanceMeters !== undefined && route.duration) {
          const estimate = { distanceMeters: route.distanceMeters, durationSeconds: Math.round(Number.parseFloat(route.duration)), source: 'GOOGLE_ROUTES' as const };
          this.travelCache.set(cacheKey, estimate); return estimate;
        }
      }
    } catch { /* fallback below */ }
    const direct = Math.round(distanceMeters(input.origin.latitude, input.origin.longitude, input.destination.latitude, input.destination.longitude));
    const speed = { WALK: 1.3, BIKE: 4.2, DRIVE: 8.3, TRANSIT: 6 }[input.mode];
    const estimate = { distanceMeters: direct, durationSeconds: Math.round(direct / speed), source: 'HAVERSINE' as const };
    this.travelCache.set(cacheKey, estimate); return estimate;
  }
}
