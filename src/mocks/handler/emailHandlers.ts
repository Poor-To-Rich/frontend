import { EMAIL } from '@/api/endpoints';
import { parseRequestBody } from '@/utils/parseRequestBody';
import { http } from 'msw';

export const emailHandlers = [
  http.post(EMAIL.EMAIL_SEND, async ({ request }) => {
    const { email } = await parseRequestBody<{ email: string }>(request);

    if (email === 'existing@example.com') {
      return new Response(JSON.stringify({ status: 400, message: '이미 사용중인 이메일입니다.' }), { status: 409 });
    }
    if (email === 'retrying@example.com') {
      return new Response(JSON.stringify({ status: 429, message: '인증 코드 재발급 횟수를 초과하였습니다.' }), {
        status: 429,
      });
    }
    if (email === 'blocking@example.com') {
      return new Response(JSON.stringify({ status: 429, message: '인증 코드 재발급 횟수를 초과하였습니다.' }), {
        status: 429,
      });
    }

    return new Response(JSON.stringify({ status: 200, message: '인증 코드 전송 성공' }), { status: 200 });
  }),
];
