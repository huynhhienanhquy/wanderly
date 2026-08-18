import { describe, expect, it, vi } from 'vitest';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';

describe('OpenAiConstraintsProvider', () => {
  it('uses Responses structured output and validates the result', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    const payload = { constraints: { peopleCount: 2, budget: null, currency: 'VND', interests: ['cafe'], excludedCategories: [], travelMode: 'DRIVE', notes: null }, missingFields: [], warnings: [] };
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(payload) }] }] }) });
    const provider = new OpenAiConstraintsProvider(fetcher);
    await expect(provider.extract({ input: 'Đi cafe 2 người', timezone: 'Asia/Ho_Chi_Minh' })).resolves.toEqual(payload);
    const request = JSON.parse(fetcher.mock.calls[0]![1]!.body as string) as { text: { format: { type: string; strict: boolean } } };
    expect(request.text.format).toMatchObject({ type: 'json_schema', strict: true });
    delete process.env.OPENAI_API_KEY;
  });
});
