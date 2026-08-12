import { z } from 'zod';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const numericInput = z
  .union([z.number(), z.string().trim().min(1)])
  .transform((value, context) => {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed)) {
      context.addIssue({
        code: 'custom',
        message: 'Giá trị phải là số hữu hạn.',
      });
      return z.NEVER;
    }
    return parsed;
  });

const moneyInput = numericInput.pipe(z.number().int().nonnegative());

export const placeImageInputSchema = z.object({
  url: z.url().max(2048),
  attribution: z.string().trim().max(500).nullable().default(null),
  isCover: z.boolean().default(false),
  sortOrder: z.number().int().nonnegative().default(0),
});

export const openingPeriodInputSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    open: z.string().regex(timePattern).nullable(),
    close: z.string().regex(timePattern).nullable(),
    isClosed: z.boolean().default(false),
  })
  .superRefine((period, context) => {
    const hasTimes = period.open !== null && period.close !== null;
    if (period.isClosed === hasTimes) {
      context.addIssue({
        code: 'custom',
        message: 'Ngày đóng cửa không có giờ; ngày mở cửa cần đủ giờ mở/đóng.',
      });
    }
  });

export const rawPlaceInputSchema = z
  .object({
    providerPlaceId: z.string().trim().min(1).max(255).nullable().default(null),
    name: z.string().trim().min(1).max(255),
    slug: z.string().trim().toLowerCase().regex(slugPattern),
    description: z.string().trim().min(1).nullable().default(null),
    address: z.string().trim().min(1),
    district: z.string().trim().min(1).max(100).nullable().default(null),
    city: z.string().trim().min(1).max(100),
    countryCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{2}$/),
    latitude: numericInput.pipe(z.number().min(-90).max(90)),
    longitude: numericInput.pipe(z.number().min(-180).max(180)),
    rating: numericInput
      .pipe(z.number().min(0).max(5))
      .nullable()
      .default(null),
    reviewCount: numericInput.pipe(z.number().int().nonnegative()).default(0),
    priceMin: moneyInput.nullable().default(null),
    priceMax: moneyInput.nullable().default(null),
    typicalDurationMinutes: numericInput
      .pipe(z.number().int().positive())
      .nullable()
      .default(null),
    indoorOutdoor: z.enum(['INDOOR', 'OUTDOOR', 'MIXED']),
    categorySlugs: z
      .array(z.string().trim().toLowerCase().regex(slugPattern))
      .min(1)
      .max(20),
    images: z.array(placeImageInputSchema).max(30).default([]),
    openingHours: z.array(openingPeriodInputSchema).max(7).default([]),
  })
  .superRefine((place, context) => {
    if (
      place.priceMin !== null &&
      place.priceMax !== null &&
      place.priceMax < place.priceMin
    ) {
      context.addIssue({
        code: 'custom',
        path: ['priceMax'],
        message: 'Giá tối đa không được thấp hơn giá tối thiểu.',
      });
    }
    if (new Set(place.categorySlugs).size !== place.categorySlugs.length) {
      context.addIssue({
        code: 'custom',
        path: ['categorySlugs'],
        message: 'Danh mục không được trùng.',
      });
    }
    if (
      new Set(place.openingHours.map(({ dayOfWeek }) => dayOfWeek)).size !==
      place.openingHours.length
    ) {
      context.addIssue({
        code: 'custom',
        path: ['openingHours'],
        message: 'Mỗi ngày chỉ có một cấu hình giờ mở cửa.',
      });
    }
    if (place.images.filter(({ isCover }) => isCover).length > 1) {
      context.addIssue({
        code: 'custom',
        path: ['images'],
        message: 'Chỉ được có một ảnh bìa.',
      });
    }
  })
  .transform((place) => ({
    ...place,
    categorySlugs: [...place.categorySlugs].sort(),
    images: [...place.images].sort(
      (left, right) => left.sortOrder - right.sortOrder,
    ),
    openingHours: [...place.openingHours].sort(
      (left, right) => left.dayOfWeek - right.dayOfWeek,
    ),
  }));

export type NormalizedPlaceInput = z.output<typeof rawPlaceInputSchema>;

export function normalizePlaceInput(input: unknown): NormalizedPlaceInput {
  return rawPlaceInputSchema.parse(input);
}
