import { z } from 'zod';

export const mapCoordinateSchema = z.object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) });
export type MapCoordinate = z.infer<typeof mapCoordinateSchema>;

export function googleMapsDirectionsUrl(destination: MapCoordinate, origin?: MapCoordinate) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('destination', `${destination.latitude},${destination.longitude}`);
  if (origin) url.searchParams.set('origin', `${origin.latitude},${origin.longitude}`);
  return url.toString();
}

export const MAP_PROVIDER = { places: 'GOOGLE_PLACES', maps: 'GOOGLE_MAPS', webFallback: 'GOOGLE_MAPS_URL', mobile: 'REACT_NATIVE_MAPS' } as const;
