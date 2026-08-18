import type { BudgetEstimate } from '@wanderly/contracts';

export function buildBudgetWarning(estimate: BudgetEstimate, limit: number | null, missing: string[]) {
  if (limit === null) return null;
  const exceededBy = Math.max(0, estimate.total - limit);
  if (exceededBy === 0) return missing.length > 0 ? { severity: 'INFO' as const, message: `Chưa thể xác nhận ngân sách vì ${missing.length} địa điểm chưa có giá.` } : null;
  const [largestType, largestAmount] = Object.entries(estimate.byType).sort((left, right) => right[1] - left[1])[0]!;
  const percent = Math.round(exceededBy / Math.max(1, limit) * 100);
  return { severity: percent >= 25 ? 'HIGH' as const : 'MEDIUM' as const, message: `Vượt ${exceededBy.toLocaleString('vi-VN')}đ (${percent}%). Nhóm chi phí lớn nhất: ${largestType} ${largestAmount.toLocaleString('vi-VN')}đ.${missing.length > 0 ? ` Còn ${missing.length} mục chưa có giá.` : ''}` };
}
