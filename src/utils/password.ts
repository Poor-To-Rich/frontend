import { z } from 'zod';

export const passwordMatchRefinement = <T extends { confirmPassword: string }>(
  schema: z.ZodType<T & { password?: string; newPassword?: string }>,
) =>
  schema.refine(
    data => {
      const password = data.password ?? data.newPassword; // signup과 changePassword 둘 다 대응
      return password === data.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다', // 검증 실패 시 출력되는 메시지
      path: ['confirmPassword'], // 에러를 표시할 필드
    },
  );
