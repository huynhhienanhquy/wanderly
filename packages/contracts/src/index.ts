import { z } from 'zod';

export const planningConstraintsSchema = z.object({
  peopleCount: z.number().int().positive(),
  budget: z.number().int().nonnegative().nullable().default(null),
  currency: z.string().length(3).default('VND'),
  interests: z.array(z.string().min(1)).max(20).default([]),
});

export type PlanningConstraints = z.infer<typeof planningConstraintsSchema>;

export const healthResponseSchema = z.object({
  service: z.string(),
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
