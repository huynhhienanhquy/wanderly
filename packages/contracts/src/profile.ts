import { z } from 'zod';
import { emailSchema } from './auth';
import { uuidSchema } from './common';

export const updateProfileRequestSchema = z
  .object({
    displayName: z.string().trim().min(1).max(100).optional(),
    avatarUrl: z.url().max(2048).nullable().optional(),
    phone: z.string().trim().min(6).max(30).nullable().optional(),
    timezone: z.string().trim().min(1).max(50).optional(),
    locale: z.string().trim().min(2).max(10).optional(),
  })
  .refine(
    (value) => Object.keys(value).length > 0,
    'Cần ít nhất một trường cập nhật.',
  );

export const profileSchema = z.object({
  id: uuidSchema,
  email: emailSchema,
  displayName: z.string(),
  avatarUrl: z.string().nullable(),
  phone: z.string().nullable(),
  timezone: z.string(),
  locale: z.string(),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
export type Profile = z.infer<typeof profileSchema>;
