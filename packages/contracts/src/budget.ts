import { z } from 'zod';

export const budgetLineSchema = z.object({
  type: z.enum(['PLACE', 'FOOD', 'TRANSPORT']),
  label: z.string().trim().min(1).max(200),
  unitAmount: z.number().int().nonnegative(),
  quantity: z.number().int().positive().default(1),
});

export const budgetEstimateSchema = z.object({
  currency: z.string().length(3).default('VND'),
  lines: z.array(budgetLineSchema.extend({ amount: z.number().int().nonnegative() })),
  byType: z.object({ PLACE: z.number().int().nonnegative(), FOOD: z.number().int().nonnegative(), TRANSPORT: z.number().int().nonnegative() }),
  total: z.number().int().nonnegative(),
});

export type BudgetLine = z.input<typeof budgetLineSchema>;
export type BudgetEstimate = z.infer<typeof budgetEstimateSchema>;

export function estimateBudget(lines: BudgetLine[], currency = 'VND'): BudgetEstimate {
  const normalized = lines.map((line) => {
    const parsed = budgetLineSchema.parse(line);
    return { ...parsed, amount: parsed.unitAmount * parsed.quantity };
  });
  const byType = { PLACE: 0, FOOD: 0, TRANSPORT: 0 };
  for (const line of normalized) byType[line.type] += line.amount;
  return budgetEstimateSchema.parse({ currency, lines: normalized, byType, total: Object.values(byType).reduce((sum, amount) => sum + amount, 0) });
}
