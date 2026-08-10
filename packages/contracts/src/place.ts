import { z } from 'zod';
import { uuidSchema } from './common';

export const placeSummarySchema = z.object({
  id: uuidSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  rating: z.number().min(0).max(5).nullable(),
  reviewCount: z.number().int().nonnegative(),
  priceMin: z.number().int().nonnegative().nullable(),
  priceMax: z.number().int().nonnegative().nullable(),
  indoorOutdoor: z.enum(['INDOOR', 'OUTDOOR', 'MIXED']),
  categories: z.array(z.string()),
  coverImageUrl: z.url().nullable(),
  distanceMeters: z.number().int().nonnegative().optional(),
});

export const placeListQuerySchema = z.object({
  query: z.string().trim().max(200).optional(),
  category: z.string().max(80).optional(),
  city: z.string().max(100).optional(),
  priceMax: z.coerce.number().int().nonnegative().optional(),
  ratingMin: z.coerce.number().min(0).max(5).optional(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radiusMeters: z.coerce.number().int().positive().max(100_000).optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const placeListResponseSchema = z.object({
  data: z.array(placeSummarySchema),
  nextCursor: z.string().nullable(),
});

export type PlaceSummary = z.infer<typeof placeSummarySchema>;
export type PlaceListQuery = z.infer<typeof placeListQuerySchema>;
export type PlaceListResponse = z.infer<typeof placeListResponseSchema>;
