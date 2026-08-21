import { distanceKilometers, type Coordinates } from './plan-duration';

export type RoutePlace = Coordinates & { id: string; name: string };
export type RoutePoint = RoutePlace & { x: number; y: number };
export type RouteSummary = { points: RoutePoint[]; totalDistanceKilometers: number };

export function buildRouteSummary(places: RoutePlace[], width = 640, height = 280, padding = 28): RouteSummary {
  const totalDistanceKilometers = places.slice(1).reduce((total, place, index) =>
    total + distanceKilometers(places[index]!, place), 0);
  if (places.length === 0) return { points: [], totalDistanceKilometers };

  const latitudes = places.map(({ latitude }) => latitude);
  const longitudes = places.map(({ longitude }) => longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const latitudeSpan = maxLatitude - minLatitude;
  const longitudeSpan = maxLongitude - minLongitude;

  const points = places.map((place) => ({
    ...place,
    x: longitudeSpan === 0 ? width / 2 : padding + (place.longitude - minLongitude) / longitudeSpan * (width - padding * 2),
    y: latitudeSpan === 0 ? height / 2 : padding + (maxLatitude - place.latitude) / latitudeSpan * (height - padding * 2),
  }));
  return { points, totalDistanceKilometers };
}
