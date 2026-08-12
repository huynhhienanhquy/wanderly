import { z } from 'zod';
import { placeSummarySchema } from './place-list';

export const placeSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(300);

export const placeImageSchema = z.object({
  url: z.string().url(),
  attribution: z.string().nullable(),
  isCover: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});

export const placeOpeningHourSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  open: z
    .string()
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .nullable(),
  close: z
    .string()
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .nullable(),
  isClosed: z.boolean(),
  validFrom: z.string().nullable(),
  validTo: z.string().nullable(),
});

export const placeDetailSchema = placeSummarySchema.extend({
  countryCode: z.string().length(2),
  images: z.array(placeImageSchema),
  openingHours: z.array(placeOpeningHourSchema),
});

export type PlaceDetail = z.infer<typeof placeDetailSchema>;
