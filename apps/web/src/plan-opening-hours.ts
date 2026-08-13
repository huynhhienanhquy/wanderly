import type { PlaceDetail } from '@wanderly/contracts';

export function isOpenAt(
  openingHours: PlaceDetail['openingHours'],
  date: string,
  time: string,
): boolean | null {
  if (!date || !time || openingHours.length === 0) return null;
  const dayOfWeek = new Date(`${date}T12:00:00`).getDay();
  const periods = openingHours.filter((period) => period.dayOfWeek === dayOfWeek);
  if (periods.length === 0) return null;
  return periods.some((period) =>
    !period.isClosed && period.open !== null && period.close !== null && time >= period.open && time < period.close,
  );
}
