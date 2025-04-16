import { EMAIL } from '@/api/endpoints';
import { EmailCodeSendReq, EmailCodeVerifyReq } from '@/types/authTypes';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { http } from 'msw';
import { checkCommonEmailErrors } from '@/mocks/utils/checkEmailErrors';

export const emailHandlers = [
  http.post(EMAIL.EMAIL_SEND, async ({ request }) => {
    const { email, purpose } = await parseRequestBody<EmailCodeSendReq>(request);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    return new Response(JSON.stringify({ status: 200, message: '인증 코드 전송 성공' }), { status: 200 });
  }),
  http.post(EMAIL.CODE_VERIFY, async ({ request }) => {
    let { email, purpose, verificationCode } = await parseRequestBody<EmailCodeVerifyReq>(request);
    verificationCode = Number(verificationCode);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    if (verificationCode === 234567) {
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
];
