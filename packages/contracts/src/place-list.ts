import { z } from 'zod';

export const placeSortSchema = z.enum([
  'popular',
  'rating',
  'newest',
  'priceAsc',
]);

export const placeListQuerySchema = z.object({
  cursor: z.string().trim().min(1).max(500).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  sort: placeSortSchema.default('popular'),
});

export const placeSummarySchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  district: z.string().nullable(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number().nullable(),
  reviewCount: z.number().int().nonnegative(),
  priceMin: z.number().int().nonnegative().nullable(),
  priceMax: z.number().int().nonnegative().nullable(),
  typicalDurationMinutes: z.number().int().positive().nullable(),
  indoorOutdoor: z.enum(['INDOOR', 'OUTDOOR', 'MIXED']),
  categories: z.array(z.object({ slug: z.string(), name: z.string() })),
  coverImageUrl: z.string().nullable(),
});

export const placeListResponseSchema = z.object({
  data: z.array(placeSummarySchema),
  nextCursor: z.string().nullable(),
});

export type PlaceListQuery = z.infer<typeof placeListQuerySchema>;
export type PlaceSummary = z.infer<typeof placeSummarySchema>;
export type PlaceListResponse = z.infer<typeof placeListResponseSchema>;
