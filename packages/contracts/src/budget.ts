import { z } from 'zod';

export const budgetLineSchema = z.object({ type: z.enum(['PLACE', 'FOOD', 'TRANSPORT']), label: z.string().min(1).max(200), amount: z.number().int().nonnegative() });
export const budgetEstimateSchema = z.object({ currency: z.string().length(3).default('VND'), lines: z.array(budgetLineSchema), subtotal: z.number().int().nonnegative(), total: z.number().int().nonnegative() });
export type BudgetLine = z.infer<typeof budgetLineSchema>;
export type BudgetEstimate = z.infer<typeof budgetEstimateSchema>;
