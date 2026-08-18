import { extractConstraintsResponseSchema, type ExtractConstraintsResponse } from '@wanderly/contracts';

export async function extractPlanningConstraints(baseUrl: string, input: string, fetcher: typeof fetch = fetch): Promise<ExtractConstraintsResponse> {
  const response = await fetcher(`${baseUrl}/ai/constraints`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }) });
  if (!response.ok) throw new Error('Không thể phân tích yêu cầu.');
  return extractConstraintsResponseSchema.parse(await response.json());
}
