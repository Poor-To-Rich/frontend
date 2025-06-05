import { z } from 'zod';

export const passwordMatchRefinement = <T extends { passwordConfirm: string; newPassword?: string; password?: string }>(
  schema: z.ZodType<T>,
) =>
  schema.refine(
    data => {
      const password = data.password ?? data.newPassword; // signup과 changePassword 둘 다 대응
      return password === data.passwordConfirm;
    },
    {
      message: '비밀번호가 일치하지 않습니다', // 검증 실패 시 출력되는 메시지
      path: ['passwordConfirm'], // 에러를 표시할 필드
    },
  );
