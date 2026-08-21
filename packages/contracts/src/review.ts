import { z } from 'zod';
import { safeTextSchema, uuidSchema } from './common';

export const upsertReviewRequestSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  content: safeTextSchema(1000).nullable().optional(),
});

export const reviewSchema = z.object({
  id: uuidSchema,
  placeId: uuidSchema,
  rating: z.number().int().min(1).max(5),
  content: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const reportReviewRequestSchema = z.object({
  reason: safeTextSchema(500).pipe(z.string().min(3)),
});

export const moderateReviewReportRequestSchema = z.object({
  status: z.enum(['RESOLVED', 'DISMISSED']),
  hideReview: z.boolean().default(false),
});

export type UpsertReviewRequest = z.infer<typeof upsertReviewRequestSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReportReviewRequest = z.infer<typeof reportReviewRequestSchema>;
export type ModerateReviewReportRequest = z.infer<typeof moderateReviewReportRequestSchema>;
