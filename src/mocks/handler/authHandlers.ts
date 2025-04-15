import { AUTH } from '@/api/endpoints';
import { parseRequestBody } from '@/utils/parseRequestBody';
import { http } from 'msw';

export const authHandlers = [
  http.post(AUTH.CHECK_USERNAME_DUPLICATE, async ({ request }) => {
    const { username } = await parseRequestBody<{ username: string }>(request);

    if (username === 'woic') {
      return new Response(JSON.stringify({ status: 409, message: '중복된 아이디입니다.' }), { status: 409 });
    }
    return new Response(JSON.stringify({ status: 200, message: '사용할 수 있는 아이디입니다.' }), { status: 200 });
  }),
  http.post(AUTH.CHECK_NICKNAME_DUPLICATE, async ({ request }) => {
    const { nickname } = await parseRequestBody<{ nickname: string }>(request);

    if (nickname === '데굴') {
      return new Response(JSON.stringify({ status: 409, message: '중복된 닉네임입니다.' }), { status: 409 });
    }
    return new Response(JSON.stringify({ status: 200, message: '사용할 수 있는 닉네임입니다.' }), { status: 200 });
  }),
];
