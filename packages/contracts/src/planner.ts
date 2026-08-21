import { z } from 'zod';

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  label: z.string().max(255).optional(),
});

export const planningConstraintsSchema = z
  .object({
    date: z.iso.date().optional(),
    startTime: z.iso.time({ precision: -1 }).optional(),
    endTime: z.iso.time({ precision: -1 }).optional(),
    peopleCount: z.number().int().positive(),
    budget: z.number().int().nonnegative().nullable().default(null),
    currency: z.string().length(3).default('VND'),
    interests: z.array(z.string().min(1)).max(20).default([]),
    excludedCategories: z.array(z.string().min(1)).max(20).default([]),
    startLocation: locationSchema.optional(),
    maxTravelRadiusMeters: z.number().int().positive().max(100_000).optional(),
    travelMode: z.enum(['WALK', 'BIKE', 'DRIVE', 'TRANSIT']).default('DRIVE'),
    notes: z.string().max(1000).nullable().default(null),
  })
  .superRefine((constraints, context) => {
    if (
      constraints.startTime &&
      constraints.endTime &&
      constraints.startTime >= constraints.endTime
    ) {
      context.addIssue({
        code: 'custom',
        message: 'endTime must be later than startTime',
        path: ['endTime'],
      });
    }
  });

export const extractConstraintsRequestSchema = z.object({
  input: z.string().trim().min(3).max(2000),
  timezone: z.string().min(1).max(50).default('Asia/Ho_Chi_Minh'),
  currentLocation: locationSchema.optional(),
});

export const extractConstraintsResponseSchema = z.object({
  constraints: planningConstraintsSchema,
  missingFields: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([]),
});

export type PlanningConstraints = z.infer<typeof planningConstraintsSchema>;
export type ExtractConstraintsRequest = z.infer<
  typeof extractConstraintsRequestSchema
>;
export type ExtractConstraintsResponse = z.infer<
  typeof extractConstraintsResponseSchema
>;
