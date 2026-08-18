import { describe, expect, it, vi } from 'vitest';
import { extractPlanningConstraints } from './ai-api';

describe('AI constraint API', () => {
  it('validates extracted constraints', async () => {
    const data = { constraints: { peopleCount: 2, budget: null, currency: 'VND', interests: [], excludedCategories: [], travelMode: 'DRIVE', notes: null }, missingFields: [], warnings: [] };
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(data) });
    await expect(extractPlanningConstraints('http://api', 'Đi chơi', fetcher)).resolves.toEqual(data);
  });
});
