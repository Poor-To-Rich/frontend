import { z } from 'zod';
import { emailRegex, koreanOnlyRegex, nicknameRegex, passwordRegex, userNameRegex } from '@/utils/regex';
import { validateDate } from '@/utils/date';
import { passwordMatchRefinement } from '@/utils/password';

// auth 관련 스키마

const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상입니다')
  .max(15, '비밀번호는 최대 15자 입니다')
  .regex(passwordRegex, '대문자 ,소문자 , 숫자, 특수문자가 각각 하나 이상 포함되어야 합니다');

export const loginSchema = z.object({
  username: z.string({ message: '아이디를 입력해주세요.' }).min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string({ message: '비밀번호를 입력해주세요.' }).min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const baseSignupSchema = z.object({
  profileImage: z.union([z.instanceof(File), z.string()]).optional(),
  username: z
    .string()
    .min(4, { message: '아이디는 최소 4자 이상입니다' })
    .max(10, { message: '아이디는 최대 10자 입니다' })
    .regex(userNameRegex, '영문자 숫자만 가능합니다'),
  password: passwordSchema,
  name: z
    .string()
    .min(1, { message: '값을 입력해주세요' })
    .min(2, { message: '두 글자 이상 입력해주세요' })
    .max(10, { message: '최대 10자입니다' })
    .regex(koreanOnlyRegex, '한글만 가능합니다'),
  nickname: z
    .string()
    .min(1, { message: '값을 입력해주세요' })
    .max(10, { message: '최대 10자입니다' })
    .regex(nicknameRegex, '특수문자 X, 한글 또는 영문자로 시작돼야합니다'),
  passwordConfirm: z.string(),
  birth: z
    .string()
    .min(1, { message: '값을 입력해주세요' })
    .refine(validateDate, '올바른 날짜 형식(YYYY-MM-DD)을 입력해주세요'),
  email: z.string().min(1, { message: '값을 입력해주세요' }).regex(emailRegex, '올바른 이메일 형식을 입력해주세요'),
  verificationCode: z.number({ message: '숫자를 입력해주세요' }).min(1, { message: '값을 입력해주세요' }),
  gender: z.string(),
  job: z.string().optional(),
});

export const signupSchema = passwordMatchRefinement(baseSignupSchema);

export const profileSchema = baseSignupSchema
  .omit({
    username: true,
    password: true,
    passwordConfirm: true,
    verificationCode: true,
    email: true,
  })
  .extend({
    isDefaultProfile: z.boolean(),
  });

export const changePasswordSchema = passwordMatchRefinement(
  z.object({
    currentPassword: z.string({ message: '비밀번호를 입력해주세요' }),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  }),
);

export const emailChangeSchema = z.object({
  email: baseSignupSchema.shape.email,
  verificationCode: baseSignupSchema.shape.verificationCode,
});
