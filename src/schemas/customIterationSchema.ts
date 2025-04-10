import { z } from 'zod';

const daysOfWeekEnum = z.enum(['월', '화', '수', '목', '금', '토', '일']);

const monthlyOptionSchema = z.union([
  z.object({
    mode: z.literal('dayOfMonth'),
    day: z.number(),
  }),
  z.object({ mode: z.literal('weekdayOfMonth'), week: z.number().min(1).max(5), dayOfWeek: daysOfWeekEnum }),
]);

export const endsSchema = z.union([
  z.object({ type: z.literal('never') }),
  z.object({ type: z.literal('after'), count: z.number().min(1).max(999) }),
  z.object({ type: z.literal('until'), date: z.string().min(1) }),
]);

export const customIterationSchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  interval: z.number().min(1).max(999),

  daysOfWeek: z.array(daysOfWeekEnum).optional(),
  monthlyOption: monthlyOptionSchema.optional(),

  ends: endsSchema,
});
