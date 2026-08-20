export const formatMoney = (amount: number, currency = 'VND', locale = 'vi-VN') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

export const formatDuration = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;
  if (hours === 0) return `${remainingMinutes} phút`;
  if (remainingMinutes === 0) return `${hours} giờ`;
  return `${hours} giờ ${remainingMinutes} phút`;
};

export const isValidPlanWindow = (startTime: string | Date, endTime: string | Date) => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return Number.isFinite(start) && Number.isFinite(end) && end > start;
};

export const getPlanDurationMinutes = (startTime: string | Date, endTime: string | Date) => {
  if (!isValidPlanWindow(startTime, endTime)) return 0;
  return Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60_000);
};

export const normalizeConstraintTags = (tags: readonly string[]) =>
  [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))].sort();
