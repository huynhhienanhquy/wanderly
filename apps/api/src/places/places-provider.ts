import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { normalizePlaceInput, type NormalizedPlaceInput } from '@wanderly/contracts';
import type { ExternalProviderAdapter } from '../external/provider-adapter';

export const PLACES_PROVIDER = Symbol('PLACES_PROVIDER');

export interface PlacesProvider extends ExternalProviderAdapter<void, NormalizedPlaceInput[]> {
  fetchPlaces(): Promise<NormalizedPlaceInput[]>;
}

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  primaryType?: string;
};

const priceByLevel: Record<string, [number, number]> = {
  PRICE_LEVEL_FREE: [0, 0],
  PRICE_LEVEL_INEXPENSIVE: [50_000, 150_000],
  PRICE_LEVEL_MODERATE: [150_000, 400_000],
  PRICE_LEVEL_EXPENSIVE: [400_000, 1_000_000],
  PRICE_LEVEL_VERY_EXPENSIVE: [1_000_000, 3_000_000],
};

function slug(value: string, providerId: string): string {
  const normalized = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${normalized || 'place'}-${providerId.slice(-8).toLowerCase().replace(/[^a-z0-9]/g, '')}`;
}

@Injectable()
export class GooglePlacesProvider implements PlacesProvider {
  readonly name = 'google-places';
  constructor(private readonly fetcher: typeof fetch = fetch) {}

  async fetchPlaces(): Promise<NormalizedPlaceInput[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) throw new ServiceUnavailableException('Google Places provider chưa được cấu hình.');
    const response = await this.fetcher('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': apiKey,
        'x-goog-fieldmask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType',
      },
      body: JSON.stringify({ textQuery: 'địa điểm vui chơi ăn uống tại Hà Nội', languageCode: 'vi', regionCode: 'VN' }),
    });
    if (!response.ok) throw new ServiceUnavailableException(`Google Places trả về lỗi ${response.status}.`);
    const payload = await response.json() as { places?: GooglePlace[] };
    return (payload.places ?? []).flatMap((place) => {
      const id = place.id;
      const name = place.displayName?.text;
      const latitude = place.location?.latitude;
      const longitude = place.location?.longitude;
      if (!id || !name || !place.formattedAddress || latitude === undefined || longitude === undefined) return [];
      const [priceMin, priceMax] = priceByLevel[place.priceLevel ?? ''] ?? [null, null];
      return [normalizePlaceInput({
        providerPlaceId: id,
        name,
        slug: slug(name, id),
        address: place.formattedAddress,
        city: 'Hà Nội',
        countryCode: 'VN',
        latitude,
        longitude,
        rating: place.rating ?? null,
        reviewCount: place.userRatingCount ?? 0,
        priceMin,
        priceMax,
        typicalDurationMinutes: null,
        indoorOutdoor: 'MIXED',
        categorySlugs: [place.primaryType?.replaceAll('_', '-') ?? 'attraction'],
      })];
    });
  }
  execute() { return this.fetchPlaces(); }
}
