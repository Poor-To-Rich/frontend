import { CUSTOM_ITERATION_CYCLE, ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { customIterationSchema } from '@/schemas/customIterationSchema';
import { z } from 'zod';

export type IterationCycleValue = (typeof ITERATION_CYCLE)[number]['value'];

export type CustomIterationCycleValue = (typeof CUSTOM_ITERATION_CYCLE)[number]['value'];

export type CustomIterationType = z.infer<typeof customIterationSchema>;
