import { z } from 'zod';
import { planningConstraintsSchema } from './planner';
import { placeSummarySchema } from './place-list';

export const candidateRequestSchema = z.object({ constraints: planningConstraintsSchema, limit: z.number().int().min(1).max(50).default(20) });
export const candidateResponseSchema = z.object({ data: z.array(placeSummarySchema) });
export type CandidateRequest = z.infer<typeof candidateRequestSchema>;
export type CandidateResponse = z.infer<typeof candidateResponseSchema>;
