import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, '카테고리명을 입력해주세요.').max(10, '카테고리명은 최대 10자까지 입력 가능합니다.'),
  color: z.string().min(1, '색상을 선택해주세요.'),
});
