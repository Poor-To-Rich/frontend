import { z } from 'zod';
import { customIterationSchema } from '@/schemas/customIterationSchema';

export const IterationActionEnum = z.enum(['THIS_ONLY', 'THIS_AND_FUTURE', 'ALL']);

export const TransactionTypeEnum = z.enum(['지출', '수입']);

export const transactionSchema = z.object({
  transactionType: TransactionTypeEnum.optional(),
  date: z.string({ message: '날짜를 입력해주세요' }).min(1, { message: '날짜를 입력해주세요' }),
  categoryName: z.string(),
  title: z.string().max(15, { message: '최대 15자입니다' }).optional(),
  cost: z
    .number({ message: '금액을 입력해주세요' })
    .min(1, { message: '1원 이상의 값을 입력해주세요' })
    .max(100000000, { message: '1억 이하의 값을 입력해주세요' }),
  paymentMethod: z.string().optional(),
  memo: z.string().optional(),
  iterationAction: IterationActionEnum.optional(),
  iterationType: z.string(),
  customIteration: customIterationSchema.optional(),
  isIterationModified: z.boolean().optional(),
});
