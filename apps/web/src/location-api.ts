import { geocodedLocationSchema, type GeocodedLocation } from '@wanderly/contracts';

export function currentBrowserLocation(geolocation: Geolocation = navigator.geolocation): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }));
}
export async function reverseGeocode(baseUrl: string, latitude: number, longitude: number, fetcher: typeof fetch = fetch): Promise<GeocodedLocation> {
  const response = await fetcher(`${baseUrl}/maps/reverse-geocode?latitude=${latitude}&longitude=${longitude}`);
  if (!response.ok) throw new Error('Không thể xác định địa chỉ.');
  return geocodedLocationSchema.parse(await response.json());
}
