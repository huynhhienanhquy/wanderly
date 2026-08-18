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
