import { z } from 'zod';
import { passwordRegex } from '@/utils/regex';

// 로그인, 회원가입 스키마

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: '아이디는 최소 4자 이상입입니다.' })
    .max(10, { message: '아이디는 최대 10자 입니다' }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상입니다')
    .max(15, '비밀번호는 최대 15자 입니다.')
    .regex(passwordRegex, '영문자, 숫자, 특수문자가 각각 하나 이상 포함되어야 합니다'),
});
