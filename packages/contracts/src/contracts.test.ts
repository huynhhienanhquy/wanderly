import { describe, expect, it } from 'vitest';
import {
  extractConstraintsRequestSchema,
  loginRequestSchema,
  planningConstraintsSchema,
} from './index';

describe('API contracts', () => {
  it('normalizes an email address', () => {
    const request = loginRequestSchema.parse({
      email: 'USER@EXAMPLE.COM',
      password: 'password123',
    });

    expect(request.email).toBe('user@example.com');
  });

  it('rejects an itinerary whose end time is not later than its start time', () => {
    const result = planningConstraintsSchema.safeParse({
      peopleCount: 2,
      startTime: '21:00',
      endTime: '14:00',
    });

    expect(result.success).toBe(false);
  });

  it('caps natural-language planner input', () => {
    const result = extractConstraintsRequestSchema.safeParse({
      input: 'x'.repeat(2001),
    });

    expect(result.success).toBe(false);
  });
});
