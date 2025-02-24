import { z } from 'zod';
import { dayRegex, emailRegex, koreanOnlyRegex, nicknameRegex, passwordRegex } from '@/utils/regex';
import { isValid, parse } from 'date-fns';

// 로그인, 회원가입 스키마

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: '아이디는 최소 4자 이상입니다.' })
    .max(10, { message: '아이디는 최대 10자 입니다' }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상입니다')
    .max(15, '비밀번호는 최대 15자 입니다.')
    .regex(passwordRegex, '영문자, 숫자, 특수문자가 각각 하나 이상 포함되어야합니다'),
});

export const signupSchema = loginSchema
  .extend({
    profileImage: z.string().optional(),
    name: z
      .string()
      .min(1, { message: '값을 입력해주세요' })
      .max(10, { message: '최대 10자입니다' })
      .regex(koreanOnlyRegex, '한글만 가능합니다.'),
    nickname: z
      .string()
      .min(1, { message: '값을 입력해주세요' })
      .max(10, { message: '최대 10자입니다' })
      .regex(nicknameRegex, '특수문자 X, 한글 또는 영문자로 시작돼야합니다'),
    confirmPassword: z.string().min(1, { message: '값을 입력해주세요' }),
    birth: z
      .string()
      .min(1, { message: '값을 입력해주세요' })
      .refine(value => {
        if (!dayRegex.test(value)) {
          return false;
        }
        const parsedDate = parse(value, 'yyyy.MM.dd', new Date());
        return isValid(parsedDate);
      }, '올바른 날짜 형식(YYYY.MM.DD)을 입력해주세요.'),
    email: z.string().min(1, { message: '값을 입력해주세요' }).regex(emailRegex, '올바른 이메일 형식을 입력해주세요.'),
    gender: z.string(),
    job: z.string().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });
