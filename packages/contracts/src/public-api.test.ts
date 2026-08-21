import { describe, expect, it } from 'vitest';
import * as contracts from './index';

describe('contracts public API', () => {
  it('exports the schemas consumed by web, mobile, and API clients', () => {
    expect([
      contracts.apiErrorSchema,
      contracts.authResponseSchema,
      contracts.placeListResponseSchema,
      contracts.planSchema,
      contracts.planningConstraintsSchema,
    ].every((schema) => typeof schema.parse === 'function')).toBe(true);
  });

  it('keeps the health response wire contract stable', () => {
    expect(contracts.healthResponseSchema.parse({
      service: 'wanderly-api',
      status: 'ok',
      timestamp: '2026-08-20T10:00:00.000Z',
    })).toEqual({
      service: 'wanderly-api',
      status: 'ok',
      timestamp: '2026-08-20T10:00:00.000Z',
    });
  });
});
