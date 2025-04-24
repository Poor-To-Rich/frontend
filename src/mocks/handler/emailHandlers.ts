import { endpoints } from '@/api/endpoints';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { http } from 'msw';
import { checkCommonEmailErrors } from '@/mocks/utils/checkEmailErrors';

export const emailHandlers = [
  http.post(endpoints.email.sendEmail, async ({ request }) => {
    const { email, purpose } = await parseRequestBody(request);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    return new Response(JSON.stringify({ status: 200, message: '인증 코드 전송 성공' }), { status: 200 });
  }),
  http.post(endpoints.email.verifyCode, async ({ request }) => {
    let { email, purpose, verificationCode } = await parseRequestBody(request);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    if (String(verificationCode).length < 6 || typeof verificationCode !== 'number') {
      return new Response(
        JSON.stringify({
          status: 400,
          message: '인증 코드가 올바르지 않습니다.',
        }),
        { status: 400 },
      );
    }

    if (verificationCode === 123456) {
      return new Response(
        JSON.stringify({
          status: 401,
          message: '인증 코드가 만료되었습니다.',
        }),
        { status: 401 },
      );
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: '이메일 인증 성공',
      }),
      { status: 200 },
    );
  }),
  http.get(endpoints.email.sendEmail, async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (email === 'last@example.com') {
      return new Response(
        JSON.stringify({
          status: 200,
          message: '남은 인증 코드 재발급 횟수는 0회입니다.',
          data: {
            remainingAttempts: 0,
          },
        }),
        { status: 200 },
      );
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: '남은 인증 코드 재발급 횟수는 2회입니다.',
        data: {
          remainingAttempts: 2,
        },
      }),
      { status: 200 },
    );
  }),
  http.get(endpoints.email.verifyCode, async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (email === 'last@example.com') {
      return new Response(
        JSON.stringify({
          status: 200,
          message: '남은 이메일 인증 횟수는 0회입니다',
          data: {
            remainingAttempts: 0,
          },
        }),
        { status: 200 },
      );
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: '남은 이메일 인증 횟수는 4회입니다',
        data: {
          remainingAttempts: 4,
        },
      }),
      { status: 200 },
    );
  }),
];
