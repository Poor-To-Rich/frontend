import { z } from 'zod';

export const daysOfWeekEnum = z.enum(['월', '화', '수', '목', '금', '토', '일']);

const modeEnum = z.enum(['dayOfMonth', 'weekdayOfMonth', 'endOfMonth']);

const monthlyOptionSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: modeEnum,
    day: z.number(),
    week: z.number().min(0).max(4),
    dayOfWeek: daysOfWeekEnum,
  }),
]);

const iterationRuleSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('daily') }),
  z.object({
    type: z.literal('weekly'),
    daysOfWeek: z.array(daysOfWeekEnum),
  }),
  z.object({
    type: z.literal('monthly'),
    monthlyOption: monthlyOptionSchema,
  }),
  z.object({ type: z.literal('yearly') }),
]);

export const endSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('never') }),
  z.object({ type: z.literal('after'), count: z.number().min(1).max(999) }),
  z.object({ type: z.literal('until'), date: z.string().min(1) }),
]);

export const customIterationSchema = z.object({
  iterationRule: iterationRuleSchema,
  cycle: z.number().min(1).max(365),
  end: endSchema,
});
