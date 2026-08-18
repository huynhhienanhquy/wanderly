import { describe, expect, it, vi } from 'vitest';
import { ConstraintExtractionService } from './constraint-extraction.service';

describe('ConstraintExtractionService', () => {
  it('falls back to deterministic extraction when the provider fails', async () => {
    const create = vi.fn().mockResolvedValue({});
    const service = new ConstraintExtractionService({ extract: vi.fn().mockRejectedValue(new Error('timeout')) } as never, { aiInteraction: { create } } as never);
    const result = await service.extract({ input: 'Đi chơi 3 người, ngân sách 2 triệu', timezone: 'Asia/Ho_Chi_Minh' });
    expect(result.constraints).toMatchObject({ peopleCount: 3, budget: 2_000_000 });
    expect(result.warnings[0]).toContain('fallback');
    expect(create).toHaveBeenCalledWith({ data: expect.objectContaining({ provider: 'local', status: 'FALLBACK', inputRedacted: { length: 34, timezone: 'Asia/Ho_Chi_Minh', hasLocation: false } }) });
  });
});
