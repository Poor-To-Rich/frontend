import { endpoints } from '@/api/endpoints';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { http, HttpResponse } from 'msw';
import { checkCommonEmailErrors } from '@/mocks/utils/checkEmailErrors';
import {
  SEND_EMAIL_SUCCESS_MSG,
  TIME_OUT_EMAIL_CODE_MSG,
  VERIFY_CODE_SUCCESS_MSG,
  WRONG_EMAIL_CODE_MSG,
} from '@/mocks/constants/email';

export const emailHandlers = [
  http.post(endpoints.email.sendEmail, async ({ request }) => {
    const { email, purpose } = await parseRequestBody(request);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    return HttpResponse.json(
      { status: 200, message: SEND_EMAIL_SUCCESS_MSG, data: { notificationMessage: '남은 인증 코드 발급 횟수: 4회' } },
      { status: 200 },
    );
  }),
  http.post(endpoints.email.verifyCode, async ({ request }) => {
    let { email, purpose, verificationCode } = await parseRequestBody(request);

    const errorResponse = checkCommonEmailErrors({ email, purpose });
    if (errorResponse) return errorResponse;

    if (String(verificationCode).length < 6 || typeof verificationCode !== 'number') {
      return HttpResponse.json(
        {
          status: 400,
          message: WRONG_EMAIL_CODE_MSG,
          data: { notificationMessage: '남은 이메일 인증 횟수: 2회' },
        },
        { status: 400 },
      );
    }

    if (verificationCode === 123456) {
      return HttpResponse.json(
        {
          status: 401,
          message: TIME_OUT_EMAIL_CODE_MSG,
          data: { notificationMessage: '남은 이메일 인증 횟수: 2회' },
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: VERIFY_CODE_SUCCESS_MSG,
      },
      { status: 200 },
    );
  }),
];
