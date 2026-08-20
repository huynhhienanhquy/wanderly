import { createPlanSchema, planSchema, type CreatePlan, type Plan } from '@wanderly/contracts';
import type { LocalPlanItem, LocalPlanMeta } from './plan-storage';

const toIso = (date: string, time: string) => new Date(`${date}T${time}:00`).toISOString();

export const buildCreatePlan = (meta: LocalPlanMeta, items: readonly LocalPlanItem[], peopleCount = 1): CreatePlan =>
  createPlanSchema.parse({
    title: meta.title,
    startTime: toIso(meta.date, items[0]?.startTime ?? '08:00'),
    endTime: toIso(meta.date, meta.endTime),
    peopleCount,
    budget: meta.budget === '' ? null : Number(meta.budget),
    items: items.map((item, position) => ({
      placeId: item.id, position, startTime: toIso(meta.date, item.startTime), durationMinutes: 90,
    })),
  });

export async function saveRemotePlan(baseUrl: string, token: string, input: CreatePlan, fetcher: typeof fetch = fetch): Promise<Plan> {
  const response = await fetcher(`${baseUrl}/plans`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('Không thể lưu kế hoạch lên tài khoản.');
  return planSchema.parse(await response.json());
}
