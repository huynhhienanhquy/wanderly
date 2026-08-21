import { candidateResponseSchema, extractConstraintsResponseSchema, type ExtractConstraintsResponse, type PlanningConstraints } from '@wanderly/contracts';

export async function extractPlanningConstraints(baseUrl: string, input: string, fetcher: typeof fetch = fetch): Promise<ExtractConstraintsResponse> {
  const response = await fetcher(`${baseUrl}/ai/constraints`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }) });
  if (!response.ok) throw new Error('Không thể phân tích yêu cầu.');
  return extractConstraintsResponseSchema.parse(await response.json());
}

export async function generatePlanCandidates(baseUrl: string, constraints: PlanningConstraints, fetcher: typeof fetch = fetch) {
  const response = await fetcher(`${baseUrl}/recommendations/candidates`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ constraints, limit: 6 }),
  });
  if (!response.ok) throw new Error('Không thể tạo kế hoạch lúc này.');
  return candidateResponseSchema.parse(await response.json()).data;
}
