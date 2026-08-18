import { z } from 'zod';

export const interestCategorySchema = z.object({
  id: z.uuid(), slug: z.string(), name: z.string(),
  icon: z.string().nullable(), description: z.string().nullable(),
});
export const interestCategoriesSchema = z.array(interestCategorySchema);
export type InterestCategory = z.infer<typeof interestCategorySchema>;
