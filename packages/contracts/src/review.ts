import { z } from 'zod';
import { uuidSchema } from './common';

export const upsertReviewRequestSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().max(1000).nullable().optional(),
});

export const reviewSchema = z.object({
  id: uuidSchema,
  placeId: uuidSchema,
  rating: z.number().int().min(1).max(5),
  content: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type UpsertReviewRequest = z.infer<typeof upsertReviewRequestSchema>;
export type Review = z.infer<typeof reviewSchema>;
