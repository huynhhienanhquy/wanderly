import { z } from 'zod';

export const healthResponseSchema = z.object({
  service: z.string(),
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export * from './place-normalization';
export * from './place-list';
export * from './place-detail';
export * from './place-api';
export * from './plan-api';
export * from './budget';
export * from './auth';
export * from './common';
export * from './planner';
export * from './profile';
export * from './review';
export * from './preference';
export * from './recommendation';
export * from './map-provider';
export * from './weather-provider';
export * from './event';
export * from './api-client';
export * from './domain-helpers';
export * from './query-keys';
export * from './deep-links';
