export type PlanValidationCategory = 'metadata' | 'places' | 'openingHours' | 'duration' | 'budget' | 'weather';

export type PlanValidationIssue = {
  category: PlanValidationCategory;
  message: string;
};

export type PlanValidationResult = {
  valid: boolean;
  issues: PlanValidationIssue[];
};

export type FinalPlanValidationInput = {
  title: string;
  date: string;
  endTime: string;
  itemCount: number;
  loadedPlaceCount: number;
  groups: Partial<Record<Exclude<PlanValidationCategory, 'metadata' | 'places'>, string[]>>;
};

export function validateFinalPlan(input: FinalPlanValidationInput): PlanValidationResult {
  const issues: PlanValidationIssue[] = [];
  if (!input.title.trim()) issues.push({ category: 'metadata', message: 'Kế hoạch chưa có tên.' });
  if (!input.date) issues.push({ category: 'metadata', message: 'Kế hoạch chưa có ngày.' });
  if (!input.endTime) issues.push({ category: 'metadata', message: 'Kế hoạch chưa có giờ kết thúc.' });
  if (input.itemCount === 0) issues.push({ category: 'places', message: 'Kế hoạch chưa có địa điểm.' });
  if (input.loadedPlaceCount < input.itemCount) issues.push({ category: 'places', message: 'Chưa tải đủ dữ liệu địa điểm để kiểm tra.' });

  (Object.entries(input.groups) as [Exclude<PlanValidationCategory, 'metadata' | 'places'>, string[]][])
    .forEach(([category, messages]) => messages.forEach((message) => issues.push({ category, message })));

  const uniqueIssues = issues.filter((issue, index) =>
    issues.findIndex((candidate) => candidate.category === issue.category && candidate.message === issue.message) === index,
  );
  return { valid: uniqueIssues.length === 0, issues: uniqueIssues };
}
