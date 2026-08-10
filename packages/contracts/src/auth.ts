import { z } from 'zod';
import { isoDateTimeSchema, uuidSchema } from './common';

export const emailSchema = z
  .email()
  .max(320)
  .transform((email) => email.toLowerCase());
export const passwordSchema = z.string().min(8).max(128);

export const registerRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: z.string().trim().min(1).max(100),
});

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(32).max(4096),
});

export const userSummarySchema = z.object({
  id: uuidSchema,
  email: emailSchema,
  displayName: z.string().min(1).max(100),
  role: z.enum(['USER', 'ADMIN']),
  createdAt: isoDateTimeSchema,
});

export const authTokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresIn: z.number().int().positive(),
});

export const authResponseSchema = z.object({
  user: userSummarySchema,
  tokens: authTokensSchema,
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
