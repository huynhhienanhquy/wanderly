import { z } from 'zod';
import { planningConstraintsSchema } from './planner';
import { placeSummarySchema } from './place-list';

export const candidateRequestSchema = z.object({ constraints: planningConstraintsSchema, limit: z.number().int().min(1).max(50).default(20) });
export const scoreComponentsSchema = z.object({ preference: z.number(), distance: z.number(), rating: z.number(), budget: z.number(), popularity: z.number() });
export const rankedCandidateSchema = z.object({ place: placeSummarySchema, score: z.number().min(0).max(1), components: scoreComponentsSchema, reason: z.string().min(1).max(240) });
export const candidateResponseSchema = z.object({ data: z.array(rankedCandidateSchema) });
export type CandidateRequest = z.infer<typeof candidateRequestSchema>;
export type CandidateResponse = z.infer<typeof candidateResponseSchema>;
export type RankedCandidate = z.infer<typeof rankedCandidateSchema>;
