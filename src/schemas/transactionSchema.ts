import { z } from 'zod';
import { customIterationSchema } from '@/schemas/customIterationSchema';

export const transactionSchema = z.object({
  date: z.string(),
  categoryName: z.string(),
  title: z.string().max(15, { message: '최대 15자입니다' }).optional(),
  cost: z
    .number()
    .min(1, { message: '1원 이상의 값을 입력해주세요' })
    .max(100000000, { message: '1억 이하의 값을 입력해주세요' }),
  paymentMethod: z.string().optional(),
  memo: z.string().optional(),
  iterationType: z.string(),
  customIteration: customIterationSchema.optional(),
});
