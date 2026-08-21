export type LocalPlanItem = { id: string; slug: string; name: string; startTime: string };
export type LocalPlanMeta = { title: string; date: string; budget: string; endTime: string; weather: 'CLEAR' | 'RAIN' | 'HEAT' };

export function parsePlanItems(raw: string | null): LocalPlanItem[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(value)) return [];
    return value.flatMap((item, index) => {
      if (!item || typeof item !== 'object') return [];
      const record = item as Record<string, unknown>;
      if (typeof record.id !== 'string' || typeof record.slug !== 'string' || typeof record.name !== 'string') return [];
      return [{ id: record.id, slug: record.slug, name: record.name, startTime: typeof record.startTime === 'string' ? record.startTime : `${String(8 + index).padStart(2, '0')}:00` }];
    });
  } catch { return []; }
}

export function sortPlanItems(items: LocalPlanItem[]): LocalPlanItem[] {
  return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function addPlanItem(items: LocalPlanItem[], item: LocalPlanItem): { items: LocalPlanItem[]; added: boolean } {
  if (items.some(({ id }) => id === item.id)) return { items, added: false };
  return { items: sortPlanItems([...items, item]), added: true };
}
