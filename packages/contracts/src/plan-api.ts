import { z } from 'zod';

export const planItemSchema = z.object({ id: z.uuid(), placeId: z.uuid(), position: z.number().int().nonnegative(), startTime: z.string().nullable(), durationMinutes: z.number().int().positive().nullable() });
export const planSchema = z.object({ id: z.uuid(), title: z.string().min(1).max(200), planDate: z.string().nullable(), budget: z.number().int().nonnegative().nullable(), items: z.array(planItemSchema) });
export const createPlanSchema = z.object({ title: z.string().min(1).max(200), planDate: z.string().nullable().optional(), budget: z.number().int().nonnegative().nullable().optional(), items: z.array(planItemSchema.omit({ id: true })).default([]) });
export type Plan = z.infer<typeof planSchema>;
export type CreatePlan = z.infer<typeof createPlanSchema>;
