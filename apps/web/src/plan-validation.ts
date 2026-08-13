export function finalPlanIssues(groups: string[][], itemCount: number): string[] {
  const issues = groups.flat();
  if (itemCount === 0) issues.unshift('Kế hoạch chưa có địa điểm.');
  return [...new Set(issues)];
}
