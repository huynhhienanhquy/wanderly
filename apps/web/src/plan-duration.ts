import type { LocalPlanItem } from './plan-storage';

export type DurationResult = { totalMinutes: number; issues: string[] };

function minutes(value: string): number {
  const [hours = 0, mins = 0] = value.split(':').map(Number);
  return hours * 60 + mins;
}

export function validateDurations(
  items: LocalPlanItem[],
  durations: Record<string, number | null | undefined>,
  endTime: string,
): DurationResult {
  const issues: string[] = [];
  let totalMinutes = 0;
  items.forEach((item, index) => {
    const duration = durations[item.id];
    if (!duration) { issues.push(`${item.name} chưa có thời lượng.`); return; }
    totalMinutes += duration;
    const finish = minutes(item.startTime) + duration;
    const next = items[index + 1];
    if (next && finish > minutes(next.startTime)) issues.push(`${item.name} chồng giờ với ${next.name}.`);
    if (endTime && finish > minutes(endTime)) issues.push(`${item.name} kết thúc sau khung kế hoạch.`);
  });
  return { totalMinutes, issues };
}
