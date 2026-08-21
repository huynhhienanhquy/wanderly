import { z } from 'zod';

export const interestCategorySchema = z.object({
  id: z.uuid(), slug: z.string(), name: z.string(),
  icon: z.string().nullable(), description: z.string().nullable(),
});
export const interestCategoriesSchema = z.array(interestCategorySchema);
export type InterestCategory = z.infer<typeof interestCategorySchema>;

export const userPreferencesSchema = z.object({ categoryIds: z.array(z.uuid()).min(3).max(20) });
export const updateUserPreferencesRequestSchema = userPreferencesSchema.refine(
  ({ categoryIds }) => new Set(categoryIds).size === categoryIds.length,
  { message: 'Danh mục sở thích không được trùng lặp.', path: ['categoryIds'] },
);
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type UpdateUserPreferencesRequest = z.infer<typeof updateUserPreferencesRequestSchema>;

export const behaviorSignalSchema = z.object({
  type: z.enum(['LOVED', 'OKAY', 'DISLIKED', 'SKIP', 'REPLACE', 'VISITED']),
  placeId: z.uuid().optional(),
  planId: z.uuid().optional(),
  planItemId: z.uuid().optional(),
  rating: z.number().int().min(1).max(5).optional(),
}).refine(({ placeId, planId, planItemId }) => placeId || planId || planItemId, {
  message: 'Tín hiệu phải gắn với place, plan hoặc plan item.',
});
export type BehaviorSignal = z.infer<typeof behaviorSignalSchema>;
