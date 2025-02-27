import { z } from 'zod';

export const baseSchema = z.object({
  date: z.string(),
  name: z.string(),
  title: z.string().max(15, { message: '최대 15자입니다' }).optional(),
  cost: z.number().min(1).max(100000000, { message: '1억 이하의 값을 입력해주세요' }),
  expenseMethod: z.string().optional(),
  memo: z.string().optional(),
});
