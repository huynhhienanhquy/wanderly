import { z } from 'zod';

export const planIdSchema = z.uuid();

export const planItemInputSchema = z.object({ placeId: z.uuid(), position: z.number().int().nonnegative(), startTime: z.iso.datetime(), durationMinutes: z.number().int().positive() });
export const planItemSchema = planItemInputSchema.extend({ id: z.uuid() });
export const planSchema = z.object({ id: z.uuid(), title: z.string(), startTime: z.iso.datetime(), endTime: z.iso.datetime(), peopleCount: z.number().int().positive(), budget: z.number().int().nonnegative().nullable(), items: z.array(planItemSchema) });
export const createPlanSchema = z.object({ title: z.string().trim().min(1).max(255), startTime: z.iso.datetime(), endTime: z.iso.datetime(), peopleCount: z.number().int().positive().default(1), budget: z.number().int().nonnegative().nullable().default(null), items: z.array(planItemInputSchema).default([]) }).refine(({ startTime, endTime }) => endTime > startTime, { message: 'endTime phải sau startTime', path: ['endTime'] });
export type Plan = z.infer<typeof planSchema>;
export type CreatePlan = z.infer<typeof createPlanSchema>;
