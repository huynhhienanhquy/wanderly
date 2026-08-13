import {
  placeListResponseSchema,
  type PlaceListResponse,
  type PlaceSort,
} from './place-list';

export type FetchLike = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export async function fetchPlacePage(
  baseUrl: string,
  options: { cursor?: string | null; limit?: number; sort?: PlaceSort } = {},
  fetcher: FetchLike = fetch,
): Promise<PlaceListResponse> {
  const url = new URL('/places', baseUrl);
  url.searchParams.set('limit', String(options.limit ?? 12));
  url.searchParams.set('sort', options.sort ?? 'popular');
  if (options.cursor) url.searchParams.set('cursor', options.cursor);

  const response = await fetcher(url.toString());
  if (!response.ok)
    throw new Error(`Không thể tải địa điểm (${response.status}).`);
  return placeListResponseSchema.parse(await response.json());
}

export function formatPlacePrice(
  priceMin: number | null,
  priceMax: number | null,
): string {
  if (priceMin === null && priceMax === null) return 'Chưa có giá';
  if (priceMin === 0 && priceMax === 0) return 'Miễn phí';
  const format = (value: number) => `${Math.round(value / 1000)}k`;
  if (priceMin === null) return `Đến ${format(priceMax!)}`;
  if (priceMax === null || priceMin === priceMax)
    return `Từ ${format(priceMin)}`;
  return `${format(priceMin)} – ${format(priceMax)}`;
}
