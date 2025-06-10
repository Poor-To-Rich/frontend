import { z } from 'zod';

export const passwordMatchRefinement = <
  T extends { passwordConfirm?: string; confirmNewPassword?: string; newPassword?: string; password?: string },
>(
  schema: z.ZodType<T>,
) =>
  schema.superRefine((data, ctx) => {
    const password = data.password ?? data.newPassword;
    const confirm = data.passwordConfirm ?? data.confirmNewPassword;

    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다',
        path: data.passwordConfirm !== undefined ? ['passwordConfirm'] : ['confirmNewPassword'],
      });
    }
  });
