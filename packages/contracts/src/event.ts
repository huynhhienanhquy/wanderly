import { z } from 'zod';

export const eventInputSchema = z.object({
  placeId: z.uuid().nullable().default(null), title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(5000).nullable().default(null),
  startTime: z.iso.datetime(), endTime: z.iso.datetime(),
  priceMin: z.number().int().nonnegative().nullable().default(null), priceMax: z.number().int().nonnegative().nullable().default(null),
  bookingUrl: z.url().nullable().default(null), status: z.enum(['DRAFT', 'PUBLISHED', 'CANCELLED']).default('DRAFT'),
}).refine(({ startTime, endTime }) => startTime < endTime, { path: ['endTime'], message: 'endTime phải sau startTime.' });
export const eventSchema = eventInputSchema.safeExtend({ id: z.uuid() });
export const eventListSchema = z.array(eventSchema);
export type EventInput = z.infer<typeof eventInputSchema>;
export type WanderlyEvent = z.infer<typeof eventSchema>;
