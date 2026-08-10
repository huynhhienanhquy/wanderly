import { z } from 'zod';
import { isoDateTimeSchema, uuidSchema } from './common';
import { planningConstraintsSchema } from './planner';

export const planItemSchema = z.object({
  id: uuidSchema,
  placeId: uuidSchema,
  orderIndex: z.number().int().nonnegative(),
  startTime: isoDateTimeSchema,
  endTime: isoDateTimeSchema,
  estimatedCost: z.number().int().nonnegative(),
  travelMode: z.enum(['WALK', 'BIKE', 'DRIVE', 'TRANSIT']).nullable(),
  travelDistanceMeters: z.number().int().nonnegative(),
  travelDurationMinutes: z.number().int().nonnegative(),
  matchScore: z.number().min(0).max(1).nullable(),
  recommendationReason: z.string().nullable(),
  source: z.enum(['GENERATED', 'MANUAL', 'REPLACED']),
});

export const planSchema = z.object({
  id: uuidSchema,
  title: z.string().min(1).max(255),
  status: z.enum(['DRAFT', 'GENERATED', 'FINALIZED', 'COMPLETED', 'CANCELLED']),
  timezone: z.string().min(1).max(50),
  startTime: isoDateTimeSchema,
  endTime: isoDateTimeSchema,
  peopleCount: z.number().int().positive(),
  budget: z.number().int().nonnegative().nullable(),
  currency: z.string().length(3),
  constraints: planningConstraintsSchema,
  estimatedCost: z.number().int().nonnegative(),
  estimatedDistanceMeters: z.number().int().nonnegative(),
  estimatedTravelMinutes: z.number().int().nonnegative(),
  matchScore: z.number().min(0).max(1).nullable(),
  items: z.array(planItemSchema),
});

export const generatePlanRequestSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  constraints: planningConstraintsSchema,
});

export const replacementOptionsRequestSchema = z.object({
  notes: z.string().trim().max(500).optional(),
  excludedPlaceIds: z.array(uuidSchema).max(50).default([]),
});

export const replacePlanItemRequestSchema = z.object({
  replacementPlaceId: uuidSchema,
  expectedPlanVersion: z.number().int().positive(),
});

export type Plan = z.infer<typeof planSchema>;
export type PlanItem = z.infer<typeof planItemSchema>;
export type GeneratePlanRequest = z.infer<typeof generatePlanRequestSchema>;
export type ReplacementOptionsRequest = z.infer<
  typeof replacementOptionsRequestSchema
>;
export type ReplacePlanItemRequest = z.infer<
  typeof replacePlanItemRequestSchema
>;
